# backend/Dockerfile
FROM eclipse-temurin:26-jdk AS build

WORKDIR /app

# Copiar arquivos do Maven da pasta 'pedidos'
COPY backend/pedidos/mvnw .
COPY backend/pedidos/mvnw.cmd .
COPY backend/pedidos/.mvn .mvn/
COPY backend/pedidos/pom.xml .

# Dar permissão de execução para o mvnw
RUN chmod +x mvnw

# Baixar dependências
RUN ./mvnw dependency:go-offline -B

# Copiar código fonte da pasta 'pedidos'
COPY backend/pedidos/src ./src

# Compilar a aplicação (pular testes para build mais rápido)
RUN ./mvnw clean package -DskipTests

# Estágio de execução
FROM eclipse-temurin:26-jdk

WORKDIR /app

# Copiar o JAR gerado
COPY --from=build /app/target/*.jar app.jar

#RUN useradd -ms /bin/bash appuser
#USER appuser

# Expor porta do backend
EXPOSE 8080

# Healthcheck
#HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
#  CMD curl -f http://localhost:8080/api/categorias || exit 1

# Executar aplicação
ENTRYPOINT ["java", "-jar", "app.jar"]