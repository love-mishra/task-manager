# Dockerfile in repo root (task-manager/)
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy entire repo (frontend ignored by .dockerignore)
COPY . .

WORKDIR /src/backend
RUN dotnet restore "TaskManagerApi.csproj"
RUN dotnet publish "TaskManagerApi.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

ENV ASPNETCORE_URLS=http://+:${PORT:-5000}
EXPOSE ${PORT:-5000}
ENTRYPOINT ["dotnet", "TaskManagerApi.dll"]
