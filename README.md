[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-green.svg)](https://fastapi.tiangolo.com)
[![Next.js](https://img.shields.io/badge/Next.js-14+-black.svg)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org)
[![Docker](https://img.shields.io/badge/Docker-Enabled-blue.svg)](https://docker.com)
[![Prometheus](https://img.shields.io/badge/Prometheus-Monitoring-orange.svg)](https://prometheus.io)
[![Grafana](https://img.shields.io/badge/Grafana-Dashboards-red.svg)](https://grafana.com)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

This is a full-stack monitoring solution that combines backend APIs with a frontend dashboard to deliver comprehensive system monitoring, application performance metrics, and business intelligence insights!

## The Setup

### Backend (FastAPI)
- **Health Monitoring**: Real-time health checks and system status monitoring
- **Metrics Collection**: Comprehensive application and system metrics
- **Dashboard APIs**: RESTful endpoints for dashboard data
- **Webhook Support**: Alert and notification webhook endpoints
- **Prometheus Integration**: Built-in Prometheus metrics collection
- **Middleware**: Request monitoring and performance tracking

### Frontend (Next.js)
- **Real-time Dashboard**: Live system metrics and performance data
- **Service Status Monitoring**: Application health and availability tracking
- **Business Intelligence**: User analytics and business metrics
- **System Performance**: CPU, memory, disk, and network monitoring
- **Grafana Integration**: Seamless integration with Grafana dashboards
- **Responsive Design**: Modern UI built with Tailwind CSS

### Monitoring Stack
- **Prometheus**: Metrics collection and storage
- **Grafana**: Visualization and dashboarding
- **AlertManager**: Alert routing and notification management
- **Docker Compose**: Easy deployment and orchestration


## Project Structure

```
SystemPulse/
├── backend/                 # FastAPI backend
│   ├── app/
│   │   ├── api/v1/         
│   │   ├── core/          
│   │   ├── monitoring/     
│   │   └── data/          
├── frontend/               # Next.js frontend
│   ├── src/app/           
│   └── src/state/        
├── monitoring/            # Monitoring stack config
│   ├── prometheus/        
│   ├── grafana/          
│   └── alertmanager/     
└── docker-compose.monitoring.yml
```

## Want to replicate?

### Prerequisites
- Docker and Docker Compose
- Python 3.8+
- Node.js 18+

### Download

```bash
git clone https://github.com/stuartasiimwe7/system_pulse.git
cd SystemPulse
```



### Backend Setup
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Monitoring Stack
```bash
docker-compose -f docker-compose.monitoring.yml up -d
```

## API Endpoints

- `GET /api/v1/health` - Health check endpoint
- `GET /api/v1/metrics` - System and application metrics
- `GET /api/v1/dashboard` - Dashboard data aggregation
- `POST /api/v1/webhook` - Webhook for alerts and notifications


## Contributing

As always, contributions are welcome! Please submit a PR.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.