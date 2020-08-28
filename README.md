---
resume: Uma aplicação de front-end que solicita dados de APIs da ações e bolsa de valores e apresenta os dados atualizados em tempo real.
live_demo: https://polazzi-finance-app.web.app/
tags: [Vue, API, Stocks, Vuex, SASS]
---

### Principais detalhes

#### Tema

`theme.config.js`
Arquivo de entrada para configurações para cores e breakpoints que vão ser utilizados ao longo da aplicação.

`src/assets/styles`
Pasta contendo arquivos de estilos com SCSS. No arquivo principal `theme.scss` são definidos os estilos utilizando variáveis CSS juntamente com as do SCSS. As variáveis de cores e breakpoints são as mesma pré-injetas com o arquivo `theme.config.js`.
Para este projeto optei por não utilizar nenhum framework de estilos.

#### Processamento Multi-Thread

`src/workers`
Web workers da aplicação. Com a ajuda do loader "comlink-loader" é possível criar métodos assíncronos que podem ser exportados para toda a aplicação. Os dados retornados serão processados como em "postMessage".

`utils/regression.js`
Código da Regressão Linear Simples, utilizado para identificar a reta de tendência dos dados históricos de cotações. Para encontrar os coeficientes foram utilizadas amostras das médias entre valores de alta e baixa das cotações.
O código é executado dentro de um Worker que também é responsável por normalizar os dados da API. Tendo-se encontrado os coeficientes é então gerado pontos de forma linear.


#### Dados alternativos/randômicos

`src/plugins/vueFaker.js`
Biblioteca utilizada para criar dados randômicos, como os preços das ações. Foi utilizado como solução alternativa para não realizar múltiplas requisições em APIs de terceiros e em detrimento da AlphaVantage não estar mais funcionando para dados da Ibovespa.

#### Views

`src/views`
A aplicação consiste de 3 views, uma para login, um painel principal e a terceira exibe detalhes de uma empresa em específico.


#### Componentes

`src/components/common`
Componentes que irão aparecer em mais de uma view.

`src/components/Dashboard`
Componentes de requisições. FakeStockRequests e StockRequests possuem métodos que funcionam como hooks para realizar sequências como solicitar dados e processá-los, além de permitir exibir slots customizados para erros e mensagem alternativa enquanto realizam processos assíncronos.

`src/components/global`
Componentes customizados de tags HTML ou que possuem características mais genéricas em aplicações.

`src/components/Login`
Formulário de autentificação.

#### Store

`src/store`
Módulo principal da aplicação, foi utilizado para exibir mensagens de alerta informativas sobre ações do usuário.

`src/store/auth`
Simula uma autentificação com Back-end salvando um booleano no localStorage/sessionStorage.

`src/store/user`
Simula a persistência do relacionamento ManyToMany (um usuário pode ter 0 ou mais itens na WatchList).


