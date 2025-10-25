# backend/Dockerfile — build + runtime for .NET 8 app (explicit csproj path)
ARG BACKEND_PROJECT=backend/TaskManagerApi.csproj

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# copy repository contents
COPY . .

# Build and publish the specified backend project
WORKDIR /src
RUN if [ -f "$BACKEND_PROJECT" ]; then echo "Using project: $BACKEND_PROJECT"; else echo "ERROR: project $BACKEND_PROJECT not found"; exit 1; fi
RUN dotnet restore "$BACKEND_PROJECT"
RUN dotnet publish "$BACKEND_PROJECT" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

# ensure ASP.NET listens on the PORT Render provides
ENV ASPNETCORE_URLS=http://+:${PORT:-5000}
EXPOSE ${PORT:-5000}

# run the published dll (assembly name matches project name by default)
ENTRYPOINT ["dotnet", "TaskManagerApi.dll"]
