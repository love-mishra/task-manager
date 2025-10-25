FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# copy repository contents (context = repo root)
COPY . .

# Ensure we use the correct project file
RUN echo "Using project: backend/TaskManagerApi.csproj"

# Restore & publish the backend project
RUN dotnet restore "backend/TaskManagerApi.csproj"
RUN dotnet publish "backend/TaskManagerApi.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

# ensure ASP.NET listens on the PORT Render provides
ENV ASPNETCORE_URLS=http://+:${PORT:-5000}
EXPOSE ${PORT:-5000}

# run the published dll (assembly name matches project name by default)
ENTRYPOINT ["dotnet", "TaskManagerApi.dll"]