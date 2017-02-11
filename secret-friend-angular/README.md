# Workshop Caravana Web: Tire sua ideia do papel 📝📲
> Angular

## # 1

Após executar o comando `ng serve` e acessar `http://localhost:4200` você irá visualizar algo diferente... Notou? Pois é...
Agora você precisa resolver esse problema, ao invés de mostrar `[object Object]`, você deve mostrar o endereço do Amigo Secreto.

```html
<h1>{{title}}</h1>
<img src="{{picture}}" width="150" alt="">
<p><strong>Data:</strong> {{eventDate}}</p>
<address>
  <strong>Endereço</strong> {{location.street}}, {{location.city}}/{{location.state}}
</address>
```

> Yay! Você acaba de aprender como visualizar informações no template utilizando variáveis ou propriedades do seu componente.

## # 2
### Criando nosso primeiro Componente

Vamos criar o componente *event* com o auxilio do Angular CLI e então analisar os arquivos criados.

```
$ ng generate component event
```

Uma das vantagens na utilização do **Angular CLI** é a atualização automática do arquivo `app.module.ts` importanto nosso EventComponent e também criando os arquivos `.ts`, `.html`, `.css` e `.spec.ts`. 

No arquivo `src/app/event/event.component.ts` você pode notar a estrutura básica de um componente criado pelo **Angular CLI** e um importante explicação que não podemos deixar passar é a do método `constructor`.

Quanto utilizamos a tag `<app-event></app-event>` em nosso HTML, este componente será criado. nosso método `constructor()` será chamado e então a renderização do template ocorrerá e será possível a visualização no navegador.

Para verfificar esse conceito basta adicionar um log qualquer e fazer reload do navegador: `console.log('O método constructor() foi chamado no EventComponent');`

Como já temos nosso *EventComponent* migramos todas propriedades e também o template para os arquivos correspondentes na pasta `src/app/event/`.

Não é considera uma boa prática instanciar variáveis ou objetos na declaração do componente diretamente, refatore o código do arquivo `src/app/event/event.component.ts` declarando tipos e usando o `this`.

> Yay! Como você está se sentindo após a criação do nosso primeiro componente? Consigo até enxergar o seu sorriso de determinação daqui.

## # 3
### Incrementando nossa UI

Até o momento estamos mostrando dados básicos do Amigo Secreto. Vamos adicionar lista de participantes e usar as diretivas **ngIf**, **ngFor** e **event binding**.

#### 3.1 Definindo um contrato para o objeto location

```js
interface Location {
  street: string;
  city: string;
  state: string;
  zip?: string;
}
```

Um dos princípios básicos do TypeScript é que a verificação de tipos (type-checking) se concentra na forma que os valores têm. 
Também conhecido como  “duck typing” ou “structural subtyping”

Ao tentar alterar o nome do atributo de `city` para `citi` já é possível ver o erro devido ao type-checking.

Também é possível declarar atributos opcionais, neste caso estamos criando o atributo zip como opcional.

#### 3.2 Adicionando uma lista de Participantes

`event.component.ts`

```js
...
friends: string[];
...

constructor() {
  ...
  this.friends = ['Juarez', 'Gustavo', 'Juckson', 'Quezia'];
  ...
}
```

`event.component.html`

```html
...
<section id="friends">
  <h3>Participantes</h3>
  {{ friends }}
</section>
```

1. Neste momento criamos a propriedade `friends` definindo esta propriedade como um Array de string.

2. Na linha 24 fazemos a atribuição de um array de strings.

3. Em nosso template utilizamos as chaves duplas para fazer o parse do array para que possamos visualizar no navegador

Ao visualizar no navegador temos este formato de renderização, mostrando cada item do array separados por vírgula, mas e se quisermos ter uma flexibilidade maior?

**ngFor** está aqui para nos ajudar quando precisamos fazer um loop em nosso template mostrando os diversos itens de uma coleção (array).

```html
...
  <ul>
    <li *ngFor="let friend of friends">
      {{ friend }}
    </li>
  </ul>
...
```

A diretiva **NgFor** instância um template uma vez por item de uma coleção. O contexto para cada template instanciado herda do contexto externo com a variável definida para o item atual, neste caso a variável friend.

Agora sim temos uma flexibilidade maior em como utilizaremos cada elemento em nosso template. 🙌

#### 3.3 Mostrando participantes após o evento de (click)

`event.component.ts`

```js
...
showParticipants: boolean;
...

constructor() {
  ...
  this.showParticipants = false;
  ...
}
```

`event.component.html`

```html
...
<section id="friends" *ngIf="showParticipants">
  ...
</section>
```

1. Primeiro definimos uma propriedade chamada showParticipants do tipo boolean.

2. No método constructor dizemos que essa propriedade tem o valor false.

3. Atualizamos o template com a diretiva ngIf

O **ngIf** remove ou recria um elemento do DOM com base em uma {expressão}. Se a expressão atribuída ao ngIf for falsa (false), então o elemento é removido do DOM, caso contrário, um clone do elemento é reinserido no DOM.

Já imaginou essa lista com 20 ou mais participantes? E é por isso que precisamos adicionar um botão que ao ser clicado mostre a lista de participantes.

**Desafio**: altere o código do template `src/app/event/event.component.html` criando um botão “Mostrar Participantes” e no componente crie um método chamado toggleParticipants().

`event.component.ts`

```js
...
  toggleParticipants() {
    if (this.showParticipants) {
      this.showParticipants = false;
    } else {
      this.showParticipants = true;
    }
  }
...
```

`event.component.html`

```html
...
</address>

<p>
  <button (click)="toggleParticipants()">{{showParticipants ? "Esconder Participantes" : "Mostrar Participantes"}}</button>
</p>
...
```

Para solucionar o desafio criamos o método `toggleParticipants()` em nosso componente e no template usamos a propriedade `showParticipants` para alterar o texto do nosso botão.

Chamamos de User Input a interação do usuário com nossa interface e isso aciona eventos no DOM. 
O Angular detectar esses eventos (event bindings) e atualiza os valores nos componentes e modelos.

> Perfeito. Já conseguimos adicionar eventos aos nossos elementos do template e isso nos proporciona um mundo cheio de fantasias… Fantasias? Nos proporciona um controle muito interessante da nossa interface 👌

## # 4
### Associando eventos (event/data binding)

Já está na hora de deixar nossa interface mais dinâmica e ver as interações dos usuários serem refletidas enquanto inserem dados e para isso utilizaremos o ngModel.

#### 4.1 Os dois métodos de formulário disponíveis no Angular

Atualmente é possível utilizar dois métodos relacionados à formulários no Angular:
- Reactive Forms
A principal diferença desse método é que você precisará criar um Model para o formulário e esse modelo precisa estar sincronizado com as definições do seu template.
Vantagens: API mais robusta e menor esforço na criação de testes.

- Template-driven Forms
Se você já utilizou o Angular 1.x você verá que os conceitos utilizados são muito semelhantes, aprenderemos mais sobre o ngForm, ngModel, ngModelGroup, submeter eventos e validação.

#### 4.2 Finalmente nosso primeiro formulário

Criamos apenas um título e um formulário simples.
Se você já teve qualquer contato com HTML, esses elementos são super básicos. Que tal incrementarmos adicionando todos outros elementos necessários para o nosso Amigo Secreto? 😊

> Lembre-se que para utilizar formulários no Angular é necessário a inclusão do FormsModule. Em nosso caso não precisamos fazer o import desse módulo, pois o Angular CLI já cuidou disso para nós.

`event.component.html`

```html
...
</section>

<hr/>

<form action="#">
  <p>
    <label for="title">Título:</label><br>
    <input type="text" name="title" id="title" [(ngModel)]="title">
  </p>
</form>
```

Você pode pensar na diretiva ngModel como sendo a responsável por dizer para o Angular que elementos ele deve ficar de olho, ou seja, nós queremos saber quando o elemento com `name=“title”` sofre alguma alteração.

```html
...
<hr/>

<form action="#">
  <p>
    <label for="title">Título:</label><br>
    <input type="text" name="title" id="title" [(ngModel)]="title">
  </p>

  <p>
    <label for="picture">Foto:</label><br>
    <input type="text" name="picture" id="picture" [(ngModel)]="picture">
  </p>

  <p>
    <label for="eventDate">Data:</label><br>
    <input type="text" name="eventDate" id="eventDate" [(ngModel)]="eventDate">
  </p>

  <p>
    <label for="street">Endereço:</label><br>
    <input type="text" name="location.street" id="street" [(ngModel)]="location.street">
    <input type="text" name="location.city" id="city" [(ngModel)]="location.city">
    <input type="text" name="location.state" id="state" [(ngModel)]="location.state">
  </p>
</form>
```

Adicionamos todos os elementos que temos em nossa interface: título, foto, data e endereço.
Vale ressaltar que na parte de endereço nós precisamos usar o formato `name=“location.street”`, pois location é um objeto Location e não esquecer que todos elementos precisam ter obrigatoriamente um atributo `name`.

O poder do data binding é muito bacana, não é não?
Eu ainda me impressiono todas vezes que adiciono um simples ngModel e tudo acontece como se fosse mágica. 🔮

#### 4.3 Utilizando formulários sem ngModel

`event.component.ts`

```js
...
addUser(user) {
  console.log(`${user} foi adicionado com sucesso`);
  this.friends.push(user);
}
...
```

`event.component.html`

```html
...
<h3>Participantes</h3>

<form (submit)="addUser(user.value)">
  <p>
    <label for="user">Adicionar</label>
    <input type="text" #user id="user">
  </p>
</form>

<ul>
...
```

Note que utilizamos em nosso template um formulário com um elemento `<input>` com o atributo #user.

**[Template reference variables](https://angular.io/docs/ts/latest/guide/template-syntax.html#!#template-reference-variables)**

Para identificar esse input utilizamos uma variável de referência do template que fará uma referência direta a esse elemento no DOM (Document Object Model)

**Criação do método `addUser()`**

E no arquivo `event.component.html` criamos o método addUser(user) que passa o valor para o array this.friends usando o método .push()

**Adicionando participantes no Amigo Secreto**

Com a utilização desses conceitos é possível criar uma funcionalidade de adição de itens em uma coleção de um jeito bem prático.

Já conseguimos adicionar participantes na nossa lista, que tal implementar a funcionalidade de excluir participantes dessa lista.

#### 4.4 Desafio
Altere o código do template `src/app/event/event.component.html` para incluir o index na diretiva **NgFor** e utilize o método `splice()` para remoção de itens de um array.

`event.component.ts`

```js
...
removeUser(index, friend) {
  console.log(`${this.friends.find(x => x === friend )} foi removido com sucesso`);
  this.friends.splice(index, 1);
}
...
```

`event.component.html`

```html
...
  <ul>
    <li *ngFor="let friend of friends; let i = index">
      {{ friend }} <button (click)="removeUser(i, friend)">x</button>
    </li>
  </ul>
</section>
...
```

Para solucionar este desafio alteramos o template `event.component.html` adicionando o index na diretiva *ngFor usando `let i = index`.
No componente criamos o método `removeUser()`.

A diretiva **NgFor** de fato é muito poderosa quando temos que iterar em uma coleção, portanto aprender mais sobre essa diretiva é essencial

**Exclusão de participantes do Amigo Secreto**

Muito bem. Agora temos as funcionalidade de listagem, adição e remoção de participantes. 
Se você ainda tiver fôlego que tal codificar a parte de edição?

## # 5
### Serviços, interagindo com dados externos

No Angular, um Serviço é basicamente qualquer conjunto de funcionalidade que queremos que esteja disponíveis para vários componentes. É uma maneira fácil de agrupar funcionalidades relacionadas.

#### 5.1 Passo a passo para utilização de um Serviço

Como de costume utilizaremos o Angular CLI para criar a estrutura básica de um serviço facilitando na inicialização do código boilerplate.

```
$ ng g service users
```

**Não esqueça de importar o HttpModule**



Também precisaríamos alterar o arquivo `app.module.ts` para adicionar o HttpModule na propriedade `imports` do `@NgModule`. 
Ao inicializar um projeto com o Angular CLI esse módulo já é importado por padrão.

**A interface User**

É considerada boa prática ter uma interface correspondente ao recurso que você está consumindo com o serviço. Vamos criar essa interface usando mais uma vez o Angular CLI.

```
$ ng g interface user
```

**O contrato da interface User**

Antes de fazer nossa primeira requisição HTTP é importante que os dados do usuário estejam de acordo com as especificações do nosso aplicativo

Para uma melhor organização a pasta `interfaces` foi criada

#### 5.2 Importando os módulos necessários

No arquivo `users.services.ts` precisaremos importar o módulo Http para realizar requisições http (get, post, put, delete)

Além disso utilizaremos também o operador `map` que se encontra no pacote rxjs. (Observables) 

```js
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UsersService {
  constructor(private http: Http) {
    console.log('UsersService foi inicializado');
  }
}
```

**Agora criamos o método getUsers()**

```js
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UsersService {
  constructor(private http: Http) {
    console.log('UsersService foi inicializado');
  }

  getUsers() {
    return this.http.get('https://jsonplaceholder.typicode.com/users')
                    .map(res => res.json());
  }
}
```

Defina o método `getUsers()` que será o responsável por fazer nossa primeira requisição http **get**.

Utilizaremos o site https://jsonplaceholder.typicode.com/ que disponibiliza uma API gratuita.

**Adicionando o serviço no componente**

```js
import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { UsersService } from '../services/users.service';
...
```

O primeiro passo que temos que fazer é importar a interface User e o serviço UsersService dentro do nosso componente `event.component.ts`

**Inclua o serviço na propriedade providers**

```js
@Component({
  ...
  providers: [ UsersService ]
})
```

Logo depois de importar o serviço UsersService já podemos incluí-lo (dependency injection) na propriedade providers do nosso componente.

**Modifique a propriedade friends**

```js
this.usersService.getUsers().subscribe(users => {
  this.friends = users;
});
```

Altere a propriedade friends para usar a interface User que criamos recentemente. Note que friends é um array, por isso mude para User[].

**Agora estamos prontos para receber os dados**

```js
...
  constructor(
    private usersService: UsersService
  ) {
...
```

Antes de utilizarmos o usersService precisamos injetá-lo no constructor(), dê uma olhadinha na linha 20.

Agora sim podemos fazer um subscribe ao método getUsers() e o retorno atribuir à nossa propriedade this.friends

**Praticamente nenhuma alteração no template**

```html
...
  <ul>
    <li *ngFor="let friend of friends; let i = index" [id]="friend.id">
      {{ friend.name }} &lt;{{friend.email}}&gt; <button (click)="removeUser(i, friend)">x</button>
    </li>
  </ul>
...
```

Em nosso componente estamos utilizando um método do nosso serviço UsersService para fazer a requisição do usuários, porém o markup do nosso template não altera em praticamente nada.

**Volte ao navegador e veja a lista de usuários**

Booya! Você agora é capaz de fazer requisições http de uma forma simples usando os módulos disponíveis pelo Angular.

#### 5.3 Desafio!

Agora nossa lista de participantes está vindo diretamente de um servidor externo, mas agora não conseguimos adicionar participantes.

Para a inclusão de participantes voltar a funcionar você precisa alterar o serviço UsersService adicionando um método addUser usando o método http post e usar este método no componente EventComponent.

**Fixed!**

`users.service.ts`

```js
...
import { Http, Headers, RequestOptions } from '@angular/http';
...
addUser(user) {
  let headers = new Headers({ 'Content-Type': 'application/json' });
  let options = new RequestOptions({ headers: headers });

  return this.http.post(this.usersUrl, { 'name': user }, options)
                  .map(res => res.json());
}
...
```

Para solucionar este desafio alteramos nosso serviço UsersService adicionando o método addUser() e utilizamos o método http post passando o payload como { ‘name’: user }

**Headers & RequestOptions**
https://angular.io/docs/ts/latest/api/http/index/BaseRequestOptions-class.html

Geralmente quando você está lidando com requisições HTTP você terá que lidar com algumas regras específicas de alguns servidores, portanto esses dois módulos te ajudarão e muito.

**Altere também o EventComponent**

`event.component.ts`

```js
addParticipant(user) {
  if (!user) { return; }

  this.usersService.addUser(user)
                    .subscribe(user => this.friends.push(user));
}
```

No EventComponent alteramos o nome do método `addUser()` para `addParticipant()` e utilizamos o método `addUser()` do UsersService, e no retorno do subscribe continuamos incluindo (.push) o novo participante no array this.friends

**Adeus conteúdo estático**

Yay! Agora temos a parte de Participantes completamente dinâmica, usando o módulo Http e um rxjs.
Se você ainda tiver fôlego que tal implementar a parte de remoção usando o método http delete?
