import {conn} from '../../db.js';

export async function createUser(name, email, password){
  const strSql = 'INSERT INTO user (name_u, email_u, passwd_u) VALUES (?, ?, ?)';    
  const [result] = await conn.query(strSql, [name, email, password]);  // callback
  return result;
}

export async function getAllUsers(){
  const strSql = 'select * from user';    
  const [result] = await conn.query(strSql);  // callback
  return result;
}

export async function getUserById(id){  
  const strSql = 'SELECT * FROM user WHERE id = ?';   
  const [result] = await conn.query(strSql,[id]);      
  return result;
}

export async function getUserByEmail(email){  
  const strSql = 'SELECT * FROM user WHERE email_u = ?';   
  const [result] = await conn.query(strSql,[email]);      
  return result;
}

export async function deleteUserById(id){  
  const strSql = 'DELETE FROM user WHERE id = ?';   
  const [result] = await conn.query(strSql,[id]);      
  return result;
}

export async function updatePasswordByEmail(newPassword, email){  
  const strSql = 'UPDATE user SET passwd_u = ? WHERE email_u = ?';   
  const [result] = await conn.query(strSql,[newPassword, email]);      
  return result;
}