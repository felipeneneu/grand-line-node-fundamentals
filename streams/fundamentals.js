// Netflix & Spotify

// Importacao de clientes via CSV (Excel)
// 1gb - 1m de linhas
// POST /upload import.csv

// 10mb/s - 100s

// 100s -> Insercoes no banco de dados

// 10mb/s -> 10.000 registros por segundos

// 2 conceitos de streams Readable Streams | Writable Streams

// Streams -> 

// process.stdin.pipe(process.stdout)

import { Readable, Writable, Transform } from 'node:stream';

class OneToHoundredStream extends Readable {
  index = 1
  _read(){
    const i = this.index++

    setTimeout(()=>{
      if(i > 100) {
      this.push(null)
    } else {
      const buf = Buffer.from(String(i))
      this.push(buf)
    }
    }, 1000)
  }
}

class InverseNumberStream extends Transform {
  _transform(chuck, encoding, callback){
    const transformed = Number(chuck.toString()) * -1

    callback(null, Buffer.from(String(transformed)))
  }
}

class MultiplyByTenStream extends Writable {
  _write(chuck, encoding, callback){
    console.log(Number(chuck.toString())*10)
    callback()
  }
}

// new OneToHoundredStream().pipe(process.stdout)
new OneToHoundredStream()
  .pipe(new InverseNumberStream())
  .pipe(new MultiplyByTenStream())