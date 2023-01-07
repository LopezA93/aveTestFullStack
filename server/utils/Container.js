const fs = require("fs");

class Contenedor {
  constructor(url) {
    this.url = url;
  }

  /*Metodos*/
  async getAll() {
    try {
      const contenido = await fs.promises.readFile(this.url, "utf-8");
      const datos = await JSON.parse(contenido);
      return datos;
    } catch (error) {
      return console.log(error);
    }
  }

  async save(obj) {
    const data = await this.getAll();
      // let id = 1
     let id = data[data.length - 1] + 1;

    obj.id = id;
    data.push(obj);

    try {
      if (data.length == 0) {
        id = 1;
        obj.id = id;
      } else {
        obj.id = data.length;
      }

      await fs.promises.writeFile(this.url, JSON.stringify(data,null, 2)) ;
      return obj;


    } catch (error) {
      console.log(error);
    }
  }

//   async getById(num) {
//     try {
//       const data = await this.getAll();
//       const filtrado = data.find((item) => {
//         if (num == item.id) {
//           return item;
//         } else {
//           return null;
//         }
//       });
//       return filtrado;
//     } catch (error) {
//       return console.log(error);
//     }
//   }

//   async deleteAll() {
//     try {
//       await fs.promises.writeFile(this.url, "[]");
//     } catch (error) {
//       console.log(error);
//     }
//   }

  async deletByID(num) {
    try {
      const data = await this.getAll();
      const filtrado = data.filter((item) => {
        if (num != item.id) {
          return item;
        } else {
          return null;
        }
      });
      fs.promises.writeFile(
        this.url,

        JSON.stringify(filtrado,null, 2)
      );



      return filtrado;
    } catch (error) {
      return console.log(error);
    }
  }
  async update(prod, id) {
    const data = await this.deletByID(id);
    const newProd = { ...prod, id };
    data.push(newProd);
    const dataFinal = data.sort((a, b) => {
      return a.id - b.id;
    });

    const nuevoArray = fs.promises.writeFile(
      this.url,
      JSON.stringify(dataFinal,null, 2)
    );
    return nuevoArray;
  }
}
module.exports = Contenedor;
