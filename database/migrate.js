#!/usr/bin/env node

// Database Migration Script for Ian Saura Data Engineering Hub
// Run this script to set up your MySQL database on DonWeb

const fs = require('fs').promises;
const path = require('path');
const mysql = require('mysql2/promise');
require('dotenv').config();

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  charset: 'utf8mb4',
  multipleStatements: true,
  ssl: process.env.DB_SSL === 'true' ? {
    rejectUnauthorized: false
  } : false
};

async function runMigration() {
  let connection;
  
  try {
    console.log('🚀 Starting database migration...');
    console.log(`📡 Connecting to ${dbConfig.host}:${dbConfig.port}`);
    
    // Create connection
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Database connection established');
    
    // Read and execute schema
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schemaSQL = await fs.readFile(schemaPath, 'utf8');
    
    console.log('📝 Executing database schema...');
    await connection.query(schemaSQL);
    console.log('✅ Database schema created successfully');
    
    // Verify tables were created
    const [tables] = await connection.query('SHOW TABLES');
    console.log('📊 Created tables:');
    tables.forEach(table => {
      const tableName = Object.values(table)[0];
      console.log(`   ✓ ${tableName}`);
    });
    
    console.log('🎉 Migration completed successfully!');
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.error('💡 Check your database connection settings in .env file');
    } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('💡 Check your database credentials (username/password)');
    } else if (error.code === 'ER_BAD_DB_ERROR') {
      console.error('💡 Database does not exist. Create it first or check DB_NAME in .env');
    }
    
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
      console.log('🔌 Database connection closed');
    }
  }
}

// Command line interface
const args = process.argv.slice(2);
const command = args[0];

switch (command) {
  case 'up':
  case 'migrate':
    runMigration();
    break;
  
  case 'test':
    testConnection();
    break;
  
  default:
    console.log(`
📋 Database Migration Tool for Ian Saura Data Engineering Hub

Usage:
  node migrate.js up       - Run database migration
  node migrate.js migrate  - Run database migration (alias)
  node migrate.js test     - Test database connection

Environment variables required:
  DB_HOST, DB_USER, DB_PASSWORD, DB_NAME

Example:
  node migrate.js up
    `);
    break;
}

async function testConnection() {
  let connection;
  
  try {
    console.log('🧪 Testing database connection...');
    connection = await mysql.createConnection(dbConfig);
    
    const [result] = await connection.query('SELECT 1 as test');
    console.log('✅ Database connection test passed');
    console.log('📊 Connection details:');
    console.log(`   Host: ${dbConfig.host}`);
    console.log(`   Port: ${dbConfig.port}`);
    console.log(`   Database: ${dbConfig.database}`);
    console.log(`   SSL: ${dbConfig.ssl ? 'enabled' : 'disabled'}`);
    
  } catch (error) {
    console.error('❌ Database connection test failed:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
} 