const express = require('express');
const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;
const dbPath = path.join(__dirname, 'ktl.db');

app.use(express.json());

let db;

// 异步初始化数据库连接和加载数据库文件
async function initDatabase() {
    try {
        const SQL = await initSqlJs();
        const filebuffer = fs.readFileSync(dbPath);
        db = new SQL.Database(filebuffer);
        console.log('SQLite database loaded successfully.');
    } catch (err) {
        console.error('Failed to load SQLite database:', err.message);
        // 如果数据库文件不存在，则提示用户先运行初始化脚本
        if (err.code === 'ENOENT') {
            console.error(`Database file not found at ${dbPath}. Please run 'node init-db.js' first.`);
        }
        // 退出应用或继续运行无数据库功能
        // process.exit(1); 
    }
}

// 确保在启动服务器前初始化数据库
initDatabase().then(() => {
    app.listen(port, () => {
        console.log(`KTL Backend listening at http://localhost:${port}`);
    });
});

// 通用API状态
app.get('/', (req, res) => {
  res.send('KTL Backend is running!');
});

app.get('/api/status', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is healthy and running on port ' + port });
});

// 数据库操作API

// GET /api/items - 获取所有项目
app.get('/api/items', (req, res) => {
    if (!db) {
        return res.status(503).json({ error: 'Database not initialized.' });
    }
    try {
        const result = db.exec("SELECT * FROM items");
        // sql.js exec returns an array of objects with columns and values
        if (result.length === 0) {
            return res.json([]);
        }

        const columns = result[0].columns;
        const values = result[0].values;
        const items = values.map(row => {
            const item = {};
            columns.forEach((col, index) => {
                item[col] = row[index];
            });
            return item;
        });

        res.json(items);
    } catch (err) {
        res.status(500).json({ error: 'Database query failed.', details: err.message });
    }
});

// POST /api/items - 添加新项目
app.post('/api/items', (req, res) => {
    if (!db) {
        return res.status(503).json({ error: 'Database not initialized.' });
    }
    const { name, description } = req.body;

    if (!name) {
        return res.status(400).json({ error: 'Name is required.' });
    }

    try {
        const stmt = db.prepare("INSERT INTO items (name, description) VALUES (?, ?)");
        stmt.run([name, description || '']);
        stmt.free();

        // 将数据库更改保存回文件
        const data = db.export();
        const buffer = Buffer.from(data);
        fs.writeFileSync(dbPath, buffer);

        res.status(201).json({ message: 'Item added successfully', name, description });
    } catch (err) {
        res.status(500).json({ error: 'Failed to insert item.', details: err.message });
    }
});

// 在进程退出时保存数据库（可选，因为每次POST都会保存）
process.on('SIGINT', () => {
    if (db) {
        console.log('Closing database connection...');
        db.close();
    }
    process.exit();
});

