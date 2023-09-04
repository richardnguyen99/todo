# Dockferfile for cache service using Redis
# Build: docker build -t cache .

FROM redis:latest

# Expose port 6379 to the outside world
EXPOSE 6379

# Run the image as a non-root user
RUN adduser --system --group --no-create-home redis
USER redis

# Run redis-server
CMD ["redis-server"]
