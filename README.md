# turret

> A self-hosted single node PaaS using only docker and docker-compose

## Installation

### Step 1: Install `docker` and `git`

Install Docker and Git in the host machine.

```bash
sudo apt install git
```

### Create a `docker-compose.yml` file

```yaml
services:
  turrent:
    image: turret/turret:latest
    network_mode: host
    volumes:
      - /run/user/1000/docker.sock:/var/run/docker.sock
      - ./services/:/app/services/
```