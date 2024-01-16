import { createHash } from "crypto";
import fetch from 'node-fetch';

const publicKey = '6077507beb2e42a5f922d36361f9bc62';
const privateKey = 'acb669a6cddc7e6a3dfd01768d14551683c5d774';
const baseUrl = 'https://gateway.marvel.com/v1/public';

export const hashPassword = (password) => {
   return createHash("md5").update(password).digest("hex");
};


const generateHash = (timestamp) => {
  const toBeHashed = `${timestamp}${privateKey}${publicKey}`;
  return createHash('md5').update(toBeHashed).digest('hex');
};

export const generateRandomPassword = () => {
    const length = 8;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset.charAt(randomIndex);
    }
    return password;
};

export const getCatalogo = async (charname) => {
    try {
      const timestamp = new Date().getTime();
      const hash = generateHash(timestamp);
  
      let apiUrl = `${baseUrl}/characters?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;
  
      if (charname) {
        apiUrl += `&nameStartsWith=${charname}`;
      }
  
      const response = await fetch(apiUrl);
      const json = await response.json();
  
      const character = json.data.results.map(hero => ({
        characterId: hero.id,
        name: hero.name,
        thumbnail: `${hero.thumbnail.path}.${hero.thumbnail.extension}`,
        url: hero.urls[0].url,
      }));
      //console.log(character);
      return character;

    } catch (error) {
      console.error('Error al obtener datos del catálogo:', error);
      throw new Error('Error al obtener datos del catálogo');
    } 
};
  
export const getAllUsers = async () => {
    try {
        const response = await fetch('http://localhost:2000/users');
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
        throw new Error("Error al obtener usuarios");
    }
};

export const getUserByEmail = async (email) => {
    try {
        const response = await fetch('http://localhost:2000/userbyemail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email}),
        });

        const result = await response.json();
        return result;
        
    } catch (error) {
        console.error(error);
        throw new Error("Error en la autenticación");
    }
};


export const valAuth = async (email, passwd) => {
    try {
        const hashedPassword = hashPassword(passwd);

        const response = await fetch('http://localhost:2000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password: hashedPassword }),
        });

        const result = await response.json();
        return result;
        
    } catch (error) {
        console.error(error);
        throw new Error("Error en la autenticación");
    }
};

export const register = async (name, email, passwd, secQuestion, secAnswer, role, confirmPassword) => {
    const hashedPassword = hashPassword(passwd)
    const hashedCPassword = hashPassword(confirmPassword);
    const hashedAnswer = hashPassword(secAnswer);  
    if(hashedPassword === hashedCPassword){
        try {
            const response = await fetch('http://localhost:2000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password: hashedPassword, secQuestion, secAnswer: hashedAnswer, role}),
            });
            const users = await response.json();
            return users;
        } catch (error) {
            console.error(error);
            throw new Error("Error al registrar usuarios");
        }
    }else{
        throw new Error("contraseña incorrecta");
    }

};

export const deleteU = async (userId) => {
    try {
        const response = await fetch(`http://localhost:2000/delete?id=${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId }),
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
        throw new Error("Error al obtener usuarios");
    }
};

/*export const updateU = async (password,email) => {
    const hashedPassword = createHash("md5").update(password).digest("hex");
    try {
        const response = await fetch(`http://localhost:2000/update?email=${email}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({password: hashedPassword, email }),
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
        throw new Error("Error al actualizar usuarios");
    }
};*/
export const updatePassword = async (email, newPassword) => {
    const hashedPassword = hashPassword(newPassword);

    try {
        const response = await fetch(`http://localhost:2000/update?email=${email}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password: hashedPassword, email }),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.msg || "Error al actualizar la contraseña");
        }
    } catch (error) {
        console.error(error);
        throw new Error("Error al actualizar la contraseña");
    }
};

export const updateUserDataByAdmin = async (id, name, email, password, secQuestion, secAnswer, role) => {
    try {
        const response = await fetch(`http://localhost:2000/update-user`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, name, email, password, secQuestion, secAnswer, role }),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.msg || "Error al actualizar el usuario");
        }
    } catch (error) {
        console.error(error);
        throw new Error("Error al actualizar el usuario");
    }
};

export const agregarPersonajeAlCarrito = async (usuarioId, nombrePersonaje, imagenPersonaje) => {
    try {
        const response = await fetch('http://localhost:2000/agregarPersonajeAlCarrito', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({usuarioId, nombrePersonaje, imagenPersonaje}),
        });
        const result = await response.json();
        return result;
        
    } catch (error) {
        console.error(error);
        throw new Error("Error en la autenticación");
    }
};

export const obtenerPersonajesCarrito = async (userId) => {
    try {
        const response = await fetch('http://localhost:2000/obtenerPersonajesCarrito', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId }),
        });
        const result = await response.json();
        console.log(result)
        return result;
        
    } catch (error) {
        console.error(error);
        throw new Error("Error en la autenticación");
    }
};
