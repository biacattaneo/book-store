
# BookStore

Este projeto é um CRUD de livros para uma livraria, utilizando JSON Server para Mock de API e implementações de testes com Karma e Jasmine para as principais features e services.

O projeto utiliza SCSS, com Flex e Grid para melhor responsividade.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.10.


## Features

- Criar um livro novo;
- Mostrar os livros na listagem;
- Atualizar as informações do livro;
- Deletar um livro.


## Demo

https://github.com/user-attachments/assets/208297e8-1bac-4c38-84b3-ee30b291b6a5


https://github.com/user-attachments/assets/c6b5d660-b2f7-4d0b-99ae-b86b0946fc22


## Run Locally

Clonar o projeto

```bash
  git clone https://github.com/biacattaneo/book-store
```

Entrar no diretorio do projeto

```bash
  cd book-store
```

Instalar as dependencias

```bash
  npm install
```

Iniciar JSON Server

```bash
  npx json-server db.json
```

Iniciar Servidor

```bash
  npm run start
```
## Running Tests

Rodar teste unitários

```bash
  npm run test
```

## Documentation

A arquitetura do projeto foi planejada para ser escalável e fácil de manter, utilizando princípios de design como **modularidade**, **componentização** e **separação de responsabilidades**. Possibilitando que o projeto possa evoluir e se adaptar às necessidades, sem comprometer a qualidade ou a funcionalidade.

### 1 - Estrutura modular

A **estrutura modular** facilita a manutenção e a escalabilidade. Cada módulo agrupa as funcionalidades relacionadas e cada componente possui suas responsabilidades específicas.
Dessa forma promove-se a reutilização de códigos, facilita a manutenção, simplifica o desenvolvimento de testes e o possibilita desenvolvimento paralelo em equipe.

### 2- Componentização

A utilização de componentes, permite uma melhor separação de funções. Cada componente é responsável por uma parte específica da interface do usuário, tornando a aplicação mais intuitiva e fácil de gerenciar.

### 3- Uso de serviços

Os serviços são utilizados para gerenciar a lógica de negócios e as chamadas de API, permitindo uma separação clara entre a apresentação e a lógica de dados.

### 4- Estrutura de Pastas

A estrutura de pastas foi feita para seguir a modularidade e a separação de responsabilidades.

```src/app/features```
: Módulo de funcionalidades da aplicação, como _create-book_, _edit-book_ e _list_.

```src/app/shared```
: Módulo de _componentes_, _serviços_, _interfaces_ e _resolvers_ que podem ser compartilhados e reutilizados.

### 5- Como implementar back-end real?


Para implementar um back-end real é necessário alterar o arquivo **proxy.config.json** para a nova rota do servidor back-end real.

```json
//proxy.config.json
{
  "/api": {
    "target": "http://seu-servidor:sua-porta/",
    "pathRewrite": {
      "^/api": ""
    }
  }
}
```
O funcionamento padrão da aplicação poderá seguir se o novo servidor respeitar o contrato já praticado com o **json-server**.


```ts
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Books } from '../interfaces/books.interface';
import type { BooksPayload } from '../interfaces/payload-books.interface';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  httpClient = inject(HttpClient);

  getAll() {
    return this.httpClient.get<Books[]>('/api/books');
  }

  get(id: string) {
    return this.httpClient.get<Books>(`/api/books/${id}`);
  }

  post(payload: BooksPayload) {
    return this.httpClient.post('/api/books', payload);
  }

  put(id: string, payload: BooksPayload) {
    return this.httpClient.put(`/api/books/${id}`, payload);
  }

  delete(id: string) {
    return this.httpClient.delete(`/api/books/${id}`);
  }
}
```

Para fins de produção, outros cuidados precisam ser tomados, como considerar CORS, variáveis de ambiente e segurança.


## Authors

- [@biacattaneo](https://github.com/biacattaneo)
