# down = Stops containers and removes containers, networks, volumes, and images created by up
# -v = remove named volumes declared in the volumes section of the

# up = Builds, (re)creates, starts, and attaches to containers for a service
# --force-recreate = Recreate containers even if their configuration and image haven't changed.
# --build Build images before starting containers.

# rm = Removes stopped service containers.
# --force -f Don't ask to confirm removal
# --stop , -s Stop the containers, if required, before removing
# --volumes , -v Remove any anonymous volumes attached to containers

docker compose down -v && docker compose up --build --force-recreate && docker-compose rm -fsv