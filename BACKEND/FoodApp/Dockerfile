# Stage 1: Build the application using Maven and OpenJDK 17
FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Run the application using a lightweight official Eclipse Temurin 17 JRE runtime
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/target/FoodApp-0.0.1-SNAPSHOT.jar app.jar

# Expose port 1004 (Tomcat port mapped locally)
EXPOSE 1004

# Run the compiled Spring Boot jar
ENTRYPOINT ["java", "-jar", "app.jar"]
