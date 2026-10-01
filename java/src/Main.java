public class Main {
    public static void main(String[] args) throws Exception {
        var server = com.sun.net.httpserver.HttpServer.create(
            new java.net.InetSocketAddress(8080), 0);
        server.createContext("/health", exchange -> {
            var body = "{\"status\":\"ok\"}".getBytes(java.nio.charset.StandardCharsets.UTF_8);
            exchange.getResponseHeaders().set("Content-Type", "application/json");
            exchange.sendResponseHeaders(200, body.length);
            exchange.getResponseBody().write(body);
            exchange.close();
        });
        server.createContext("/", exchange -> {
            var body = """
                {"app":"fil-rouge-java","message":"Hello from the DevOps fil rouge","stack":"Java 21 + Docker","formation":"Introduction au DevOps - 3 jours"}
                """.getBytes(java.nio.charset.StandardCharsets.UTF_8);
            exchange.getResponseHeaders().set("Content-Type", "application/json");
            exchange.sendResponseHeaders(200, body.length);
            exchange.getResponseBody().write(body);
            exchange.close();
        });
        server.setExecutor(null);
        System.out.println("fil-rouge-java listening on :8080");
        server.start();
    }
}
