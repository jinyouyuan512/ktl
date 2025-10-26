const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');

// 数据库文件路径
const dbPath = path.join(__dirname, 'ktl.db');

async function initializeDatabase() {
    try {
        const SQL = await initSqlJs();
        let db;

        // 如果数据库文件存在，先删除，保证每次都是全新的
        if (fs.existsSync(dbPath)) {
            fs.unlinkSync(dbPath);
            console.log(`Removed existing database file: ${dbPath}`);
        }

        // 创建一个新的数据库
        db = new SQL.Database();
        console.log('Created a new in-memory SQLite database.');

        // 示例表创建语句
        const createTableSql = `
        CREATE TABLE IF NOT EXISTS items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
        `;

        // 执行创建表
        db.run(createTableSql);
        console.log('Table "items" created.');

        // 插入一些示例数据
        const insertStmt = db.prepare('INSERT INTO items (name, description) VALUES (?, ?)');
        insertStmt.run(['Game Strategy Guide', 'A comprehensive guide for the latest game update.']);
        insertStmt.run(['AI Assistant Prompt', 'The initial prompt used for the AI game strategist.']);
        insertStmt.run(['User Feedback', 'A placeholder item for collecting user reviews.']);
        insertStmt.free();
        console.log('Inserted 3 sample items.');

        // 将数据库写入文件
        const data = db.export();
        const buffer = Buffer.from(data);
        fs.writeFileSync(dbPath, buffer);
        console.log(`Database saved to file: ${dbPath}`);

        db.close();
        console.log('Database initialized and closed.');

    } catch (err) {
        console.error('Database initialization failed:', err.message);
    }
}

initializeDatabase();

