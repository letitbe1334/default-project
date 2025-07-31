module.exports = {
  apps: [
    {
      name: 'AWS_SERVER',
      script: 'server/index.cjs', // 애플리케이션의 진입점 파일명
      instances: 1, // 실행할 프로세스의 인스턴스 수
      autorestart: true, // 애플리케이션의 자동 재시작 여부
      watch: true, // 파일 변경 감지 및 재시작 여부
      max_memory_restart: '2G', // 메모리 사용량을 기준으로 재시작하는 설정
      env: {
        // 환경 변수
        NODE_ENV: 'production',
        BASE_URL: '/',
        VITE_UPLOAD_TYPE: 'AWS',
        VITE_API_URL: 'https://shms-i.andami.kr'
      }
    }
  ]
}
