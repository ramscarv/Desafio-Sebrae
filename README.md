# 📦 Mini Sistema de Pedidos

Sistema completo de gerenciamento de pedidos, produtos e categorias com backend em Spring Boot e frontend em React.

## 📋 Índice

- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação e Execução](#-instalação-e-execução)
- [Como Usar](#-como-usar)
- [Decisões Técnicas](#-decisões-técnicas-adotadas)
- [Principais Regras](#-principais-regras-implementadas)
- [Endpoints da API](#-endpoints-da-api)
- [Observações e Simplificações](#-observações-sobre-simplificações)
- [Melhorias Futuras](#-melhorias-que-seriam-realizadas-com-mais-tempo)
- [Estrutura do Projeto](#-estrutura-do-projeto)

---

## 🚀 Tecnologias Utilizadas

### Backend
| Tecnologia | Versão | Descrição |
|------------|--------|-------------|
| Java | 26 | Linguagem principal |
| Spring Boot | 4.0 | Framework para API REST |
| Spring Data JPA | 4.0 | ORM para persistência |
| H2 Database | - | Banco em memória |
| Apache Maven | 3.9.15 | Gerenciador de dependências |

### Frontend
| Tecnologia | Versão | Descrição |
|------------|--------|-------------|
| React | 18.2.0 | Biblioteca UI |
| Vite | 5.0.8 | Build tool |
| Axios | 1.6.0 | Cliente HTTP |
| CSS3 | - | Estilização |

---

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:
# Verifique as versões necessárias  
java --version         # Java 26 ou superior  
mvn --version          # Maven 3.9+  
node --version         # Node.js 18+  
npm --version          # npm 9+   

Instalação dos Pré-requisitos
Java: https://www.oracle.com/java/technologies/downloads/  
Maven: https://maven.apache.org/download.cg  
Node.js: https://nodejs.org/

## 📋 Instalação e Execução

### 1. Clonar o Repositório
git clone <url-do-repositorio>
cd mini-sistema-pedidos

### 2. Executar o Backend (Spring Boot)
Navegue até a pasta do backend: cd backend  
Execute o Maven: "mvnw spring-boot:run"  

✅ Aguarde a mensagem de sucesso:
Tomcat started on port(s):  
8080 (http) with context path ''  
Started PedidosApplication in X seconds  
Backend estará disponível em: http://localhost:8080/api

Console H2: http://localhost:8080/h2-console  
JDBC URL: jdbc:h2:mem:pedidosdb  
Username: sa  
Password: (deixar em branco)

### 3. Executar o Frontend (React)
Abra um novo terminal e navegue até o frontend: cd frontend  
Instale as dependências: npm install 
Inicie o servidor: npm run dev  
✅ Frontend estará disponível em: http://localhost:3000

### 4. Acessar a Aplicação
Abra o navegador e acesse: http://localhost:3000  
A aplicação está pronta para uso! 🎉

## 📖 Como Usar
Fluxo Básico de Operação

1️⃣ Primeiro, crie uma Categoria  
Digite o nome → Clique em "Criar Categoria"

2️⃣ Cadastre Produtos  
Preencha: Nome, Descrição, Preço, Estoque  
Selecione a categoria → Clique em "Cadastrar Produto"

3️⃣ Crie Pedidos  
Vá para aba "Pedidos"  
Adicione itens → Selecione produto e quantidade  
Clique em "Criar Pedido"

4️⃣ Gerencie Produtos  
Editar: Clique em "Editar" ao lado do produto  
Excluir: Clique em "Excluir" (apenas produtos sem pedidos)  
Buscar: Use o campo de busca por nome

5️⃣ Visualize Pedidos  
Listagem automática de todos os pedidos  
Clique em "Ver Detalhes" para mais informações  

## 🎯 Decisões Técnicas Adotadas
### Backend

Unicidade de Nomes  
Categorias: ✅ Implementei unicidade de nome para evitar duplicação e garantir consistência na categorização
Produtos: ❌ Não implementei unicidade para permitir produtos similares de diferentes fornecedores.  

Busca de Produtos  
Busca parcial e case-insensitive  
Retorna todos os produtos cujo nome contenha o termo pesquisado  

Exclusão de Produtos  
Produtos já utilizados em pedidos não podem ser excluídos para manter integridade histórica  
Retorna status HTTP 409 (Conflict) com mensagem clara  
Produtos sem vínculo com pedidos podem ser excluídos normalmente  

Estratégia de Preços  
O precoUnitarioNoMomentoDaCompra é armazenado no pedido  
Preserva o valor histórico mesmo se o preço do produto for alterado posteriormente  

Tratamento de Erros  
Tratamento centralizado com @RestControllerAdvice  
Status HTTP apropriados para cada situação  
Mensagens claras e amigáveis para o usuário  

Organização do Código  
Arquitetura em camadas (Controller, Service, Repository)  
Uso de DTOs para transferência de dados  
Separação clara de responsabilidades  

### Frontend
Estado da Aplicação  
Uso de Hooks React (useState, useEffect)  
Comunicação com API via Axios com interceptors  

Experiência do Usuário  
Feedback visual com mensagens de sucesso/erro (auto-destrutivas)  
Animações suaves para transições  
Modal para detalhamento de pedido  
Abas para organização do conteúdo  

Proxy de Desenvolvimento  
Configuração de proxy no Vite para evitar problemas de CORS  

Redirecionamento automático de /api para http://localhost:8080/api  

## 📐 Principais Regras Implementadas

#### Produtos

| Regra | Status | Descrição |
|-------|--------|-----------|
| Nome obrigatório | ✅ | Não permite cadastro sem nome |
| Preço ≥ zero | ✅ | Valida preços negativos |
| Estoque ≥ zero | ✅ | Não permite estoque negativo |
| Categoria obrigatória | ✅ | Produto deve pertencer a uma categoria |
| Busca por nome | ✅ | Busca parcial case-insensitive |
| Edição completa | ✅ | Permite alterar todos os campos |
| Exclusão com validação | ✅ | Impede exclusão de produtos com pedidos |

#### Pedidos

| Regra | Status | Descrição |
|-------|--------|-----------|
| Não permite sem itens | ✅ | Valida lista de itens vazia |
| Quantidade > zero | ✅ | Cada item deve ter quantidade positiva |
| Estoque suficiente | ✅ | Verifica antes de criar pedido |
| Baixa automática | ✅ | Atualiza estoque após pedido |
| Cálculo do total | ✅ | Calcula automaticamente no backend |
| Preço histórico | ✅ | Preserva preço do momento da compra |

#### Categorias

| Regra | Status | Descrição |
|-------|--------|-----------|
| Nome obrigatório | ✅ | Campo obrigatório |
| Unicidade de nome | ✅ | Nomes duplicados não são permitidos |
| Listagem completa | ✅ | Retorna todas as categorias |

## 📝 Endpoints da API

### Produtos

| Regra | Status | Descrição |
|-------|--------|-----------|
| Nome obrigatório | ✅ | Não permite cadastro sem nome |
| Preço ≥ zero | ✅ | Valida preços negativos |
| Estoque ≥ zero | ✅ | Não permite estoque negativo |
| Categoria obrigatória | ✅ | Produto deve pertencer a uma categoria |
| Busca por nome | ✅ | Busca parcial case-insensitive |
| Edição completa | ✅ | Permite alterar todos os campos |
| Exclusão com validação | ✅ | Impede exclusão de produtos com pedidos |

### Pedidos

| Regra | Status | Descrição |
|-------|--------|-----------|
| Não permite sem itens | ✅ | Valida lista de itens vazia |
| Quantidade > zero | ✅ | Cada item deve ter quantidade positiva |
| Estoque suficiente | ✅ | Verifica antes de criar pedido |
| Baixa automática | ✅ | Atualiza estoque após pedido |
| Cálculo do total | ✅ | Calcula automaticamente no backend |
| Preço histórico | ✅ | Preserva preço do momento da compra |

### Categorias

| Regra | Status | Descrição |
|-------|--------|-----------|
| Nome obrigatório | ✅ | Campo obrigatório |
| Unicidade de nome | ✅ | Nomes duplicados não são permitidos |
| Listagem completa | ✅ | Retorna todas as categorias |

## 📝 Endpoints da API - Categorias

| Método | Endpoint | Descrição | Status HTTP |
|--------|----------|-----------|-------------|
| POST | `/api/categorias` | Criar categoria | 201 Created |
| GET | `/api/categorias` | Listar categorias | 200 OK |

### Endpoints da API - Produtos

| Método | Endpoint | Descrição | Status HTTP |
|--------|----------|-----------|-------------|
| POST | `/api/produtos` | Criar produto | 201 Created |
| PUT | `/api/produtos/{id}` | Editar produto | 200 OK |
| GET | `/api/produtos` | Listar produtos | 200 OK |
| GET | `/api/produtos/buscar?nome={nome}` | Buscar produto | 200 OK |
| DELETE | `/api/produtos/{id}` | Excluir produto | 204 No Content |

### Endpoints da API - Pedidos

| Método | Endpoint | Descrição | Status HTTP |
|--------|----------|-----------|-------------|
| POST | `/api/pedidos` | Criar pedido | 201 Created |
| GET | `/api/pedidos` | Listar pedidos | 200 OK |
| GET | `/api/pedidos/{id}` | Detalhar pedido | 200 OK |

#### Exemplos de Requisições

Criar Categoria  
 
POST /api/categorias  
{  
  "nome": "Eletrônicos"  
}  

Criar Produto  
 
POST /api/produtos  
{  
  "nome": "Smartphone",  
  "descricao": "Smartphone de última geração",  
  "preco": 1999.99,  
  "quantidadeEmEstoque": 100,  
  "categoriaId": 1  
}  

Criar Pedido  

POST /api/pedidos  
{  
  "itens": [  
    {  
      "produtoId": 1,  
      "quantidade": 2  
    }  
  ]  
}  

## 🔍 Observações sobre Simplificações
Banco de Dados  
✅ Utilizei H2 em memória para facilitar o teste  
⚠️ Dados são perdidos ao reiniciar a aplicação  
📝 Para produção, seria necessário configurar um banco persistente (PostgreSQL, MySQL)  

Autenticação  
❌ Sistema não possui autenticação/autorização  
📝 Em produção, seria necessário implementar Spring Security com JWT  

Frontend  
❌ Sem gerenciamento de estado global (Redux/Context API)  
📝 Para escala maior, seria necessário implementar  

Validações  
✅ Validações básicas implementadas  
📝 Validações mais complexas (CPF, email, etc) não são necessárias para o escopo  

Logs  
✅ Logs básicos do Spring Boot  
📝 Para produção, seria necessário implementar logging estruturado  

## 🚀 Melhorias que seriam realizadas com mais tempo
#### Backend
1. Autenticação e Autorização  
Implementar Spring Security com JWT  
Diferentes níveis de acesso (admin, usuário comum)  
Refresh token para sessões longas  

2. Banco de Dados  
Migrar para PostgreSQL ou MySQL  
Implementar migrations com Flyway ou Liquibase  
Configurar pooling de conexões (HikariCP)  

3. Testes  
java  
// Testes unitários com JUnit e Mockito  
// Testes de integração  
// Testes end-to-end  
Cobertura mínima de 80%  
Testes de carga com JMeter  

4. Documentação da API  
Implementar Swagger/OpenAPI complet  
Documentar todos os endpoints e modelos  
Gerar client SDK automaticamente  

5. Validações Avançadas  
Implementar validações customizadas  
Bean Validation com grupos  
Regras de negócio mais complexas  

6. Performance  
Implementar cache com Redis  
Paginação para listagens (Pageable)  
Consultas otimizadas com JPQL  
Índices no banco de dados  

7. Monitoramento  
Actuator para métrica  
Health checks  
Logs estruturados (ELK stack)  

#### Frontend  
1. Gerenciamento de Estado  
Implementar Redux Toolkit ou Context API  
Cache de dados para melhor performance  
Persistência de estado (Redux Persist)  

2. UI/UX Melhorias  
Design responsivo completo (mobile-first)  
Temas claro/escuro  
Componentes mais sofisticados (Material-UI ou Ant Design)  
Loading skeletons e placeholders  

3. Funcionalidades Adicionais  
Gráficos de vendas (Chart.js)  
Relatórios em PDF (jsPDF)  
Exportação de dados (CSV/Excel)  
Carrinho de compras temporário   

4. Testes  
javascript  
// Testes unitários com Jest  
// Testes de componentes com React Testing Library  
// Testes end-to-end com Cypress  

5. PWA  
Transformar em Progressive Web App  
Funcionalidade offline com Service Worker  
Notificações push  

6. WebSockets  
Notificações em tempo real  
Atualização automática de estoque  
Chat de suporte  

7. DevOps  
Docker e Docker Compose  
CI/CD com GitHub Actions  
Deploy automatizado (Heroku/Vercel)  

## 📁 Estrutura do Projet
mini-sistema-pedidos/  
│  
├── README.md                          # Documentação principal  
│  
├── backend/                           # Backend Spring Boot  
│   ├── pom.xml                        # Dependências Maven  
│   ├── mvnw                           # Maven wrapper (Linux/Mac)  
│   ├── mvnw.cmd                       # Maven wrapper (Windows)  
│   │  
│   └── src/main/java/com/desafio/pedidos/  
│       ├── PedidosApplication.java    # Classe principal  
│       │  
│       ├── controller/                # Controladores REST  
│       │   ├── CategoriaController.java  
│       │   ├── ProdutoController.java  
│       │   └── PedidoController.java  
│       │  
│       ├── model/                     # Entidades JPA  
│       │   ├── Categoria.java  
│       │   ├── Produto.java  
│       │   ├── Pedido.java  
│       │   └── PedidoItem.java  
│       │  
│       ├── repository/                # Repositórios JPA  
│       │   ├── CategoriaRepository.java  
│       │   ├── ProdutoRepository.java  
│       │   └── PedidoRepository.java  
│       │  
│       ├── service/                   # Regras de negócio  
│       │   ├── CategoriaService.java  
│       │   ├── ProdutoService.java  
│       │   └── PedidoService.java  
│       │  
│       ├── dto/                       # Objetos de transferência  
│       │   ├── CategoriaDTO.java  
│       │   ├── ProdutoDTO.java  
│       │   ├── PedidoDTO.java  
│       │   └── PedidoItemDTO.java  
│       │  
│       ├── exception/                 # Tratamento de erros  
│       │   ├── BusinessException.java  
│       │   ├── ResourceNotFoundException.java   
│       │   └── GlobalExceptionHandler.java  
│       │     
│       └── config/                    # Configurações  
│           └── WebConfig.java         # Configuração CORS  
│  
└── frontend/                          # Frontend React  
    ├── package.json                   # Dependências npm  
    ├── vite.config.js                 # Configuração do Vite  
    ├── index.html                     # HTML principal  
    │  
    └── src/  
        ├── main.jsx                   # Entry point  
        ├── App.jsx                    # Componente principal  
        ├── App.css                    # Estilos globais  
        │  
        ├── components/                # Componentes React  
        │   ├── Mensagem.jsx           # Mensagens de feedback  
        │   ├── CategoriaLista.jsx     # Lista de categorias  
        │   ├── ProdutoForm.jsx        # Formulário de produtos  
        │   ├── ProdutoLista.jsx       # Lista de produtos  
        │   ├── PedidoForm.jsx         # Formulário de pedidos  
        │   ├── PedidoLista.jsx        # Lista de pedidos  
        │   └── PedidoDetalhe.jsx      # Detalhe do pedido  
        │  
        └── services/                  # Serviços API  
            └── api.js                 # Cliente Axios  

### 📊 Diagrama do Banco de Dados
-- Estrutura das tabelas  

CATEGORIAS (  
    id BIGINT PRIMARY KEY AUTO_INCREMENT,  
    nome VARCHAR(255) NOT NULL UNIQUE
    )  

PRODUTOS (  
    id BIGINT PRIMARY KEY AUTO_INCREMENT,  
    nome VARCHAR(255) NOT NULL,  
    descricao VARCHAR(255),  
    preco DECIMAL(10,2) NOT NULL,  
    quantidade_em_estoque INT NOT NULL,  
    categoria_id BIGINT NOT NULL,  
    FOREIGN KEY (categoria_id) REFERENCES CATEGORIAS(id)
    )  

PEDIDOS (  
    id BIGINT PRIMARY KEY AUTO_INCREMENT,  
    data_hora TIMESTAMP NOT NULL,  
    valor_total DECIMAL(10,2) NOT NULL
    )  

PEDIDOS_ITENS (  
    id BIGINT PRIMARY KEY AUTO_INCREMENT,  
    pedido_id BIGINT NOT NULL,  
    produto_id BIGINT NOT NULL,  
    quantidade INT NOT NULL,  
    preco_unitario DECIMAL(10,2) NOT NULL,  
    subtotal DECIMAL(10,2) NOT NULL,  
    FOREIGN KEY (pedido_id) REFERENCES PEDIDOS(id),  
    FOREIGN KEY (produto_id) REFERENCES PRODUTOS(id)
    )  

## 📄 Licença
Este projeto foi desenvolvido para fins de avaliação técnica.

## 👨‍💻 Autor
Desenvolvido como parte de desafio técnico para avaliação de habilidades full stack.