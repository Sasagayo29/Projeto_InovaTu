# Etapa 1: Build com Maven e Java 21
FROM maven:3.9-eclipse-temurin-21-alpine AS build
WORKDIR /build
COPY pom.xml .
COPY src ./src
# Compila o projeto (pulando testes para agilidade no deploy)
RUN mvn clean package -DskipTests

# Etapa 2: Runtime Otimizada
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Cria os diretórios de log e config para garantir que existam
RUN mkdir -p /app/config && \
    mkdir -p /var/log/inovatu

# Copia o JAR gerado na etapa de build
COPY --from=build /build/target/*.jar app.jar

# Define volumes para persistência (embora o docker-compose também o faça)
VOLUME /var/log/inovatu
VOLUME /app/config

# Expõe a porta padrão do Spring Boot
EXPOSE 8080

# Comando de inicialização
ENTRYPOINT ["java", "-jar", "app.jar"]