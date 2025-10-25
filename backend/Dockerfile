# backend/Dockerfile — copy only the backend folder to avoid context ignore issues
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# copy only backend folder (preserves structure at /src/backend)
COPY backend/ ./backend/

# debug: list files copied (appears in Render logs)
RUN echo "=== /src contents ===" && ls -la /src || true
RUN echo "=== /src/backend contents ===" && ls -la /src/backend || true

# Restore & publish the backend project explicitly
RUN dotnet restore "/src/backend/TaskManagerApi.csproj"
RUN dotnet publish "/src/backend/TaskManagerApi.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

ENV ASPNETCORE_URLS=http://+:${PORT:-5000}
EXPOSE ${PORT:-5000}

ENTRYPOINT ["dotnet", "TaskManagerApi.dll"]
