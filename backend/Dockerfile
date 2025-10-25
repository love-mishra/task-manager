# backend/Dockerfile — build + runtime for .NET 8 app
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# copy project files and restore + publish
COPY ./backend/* ./backend/
WORKDIR /src/backend
RUN dotnet restore
RUN dotnet publish -c Release -o /app/publish

# runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .
# Use the PORT env provided by Render; fallback to 5000
ENV ASPNETCORE_URLS=http://+:${PORT:-5000}
EXPOSE ${PORT:-5000}
ENTRYPOINT ["dotnet", "TaskManagerApi.dll"]
