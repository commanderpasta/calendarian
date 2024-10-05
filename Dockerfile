FROM maven:3.9.9-eclipse-temurin-21-jammy

# Create app directory
WORKDIR /usr/src/app

# Copy the project files
COPY . .

# Install mysql connector
RUN curl -L -o /mysql-connector-java-5.1.34.jar https://repo1.maven.org/maven2/mysql/mysql-connector-java/5.1.34/mysql-connector-java-5.1.34.jar
ENV CLASSPATH=/mysql-connector-java-5.1.34.jar:${CLASSPATH}

EXPOSE 8080 8000

CMD ["mvn", "org.springframework.boot:spring-boot-maven-plugin:run"]