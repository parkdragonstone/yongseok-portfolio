// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    } else {
        navbar.style.backgroundColor = 'white';
    }
}); 

// Portfolio Filtering
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    // 초기 상태에서 모든 아이템이 보이도록 설정
    portfolioItems.forEach(item => {
        item.classList.add('show');
    });

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.classList.add('show');
                } else {
                    item.classList.remove('show');
                }
            });
        });
    });

    // Portfolio Item Click Handler
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    portfolioCards.forEach(card => {
        card.addEventListener('click', () => {
            // Here you can add code to show detailed modal
            // For example:
            showPortfolioDetail(card.getAttribute('data-id'));
        });
    });
});

// Portfolio Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('portfolioModal');
    const closeButton = modal.querySelector('.close-button');
    
    // 포트폴리오 아이템 클릭 이벤트
    document.querySelectorAll('.portfolio-card').forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-id');
            showProjectDetails(projectId);
        });
    });

    // 모달 닫기
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // 모달 외부 클릭 시 닫기
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});

// 프로젝트 상세 정보 표시
function showProjectDetails(projectId) {
    const modal = document.getElementById('portfolioModal');
    const projectData = getProjectData(projectId); // 프로젝트 데이터 가져오기

    // 모달 내용 업데이트
    modal.querySelector('.modal-title').textContent = projectData.title;
    
    // 코드 링크 설정
    const siteLink = modal.querySelector('.site-info');
    if (projectData.site) {
        siteLink.innerHTML = `<a href="${projectData.site}" target="_blank">Site Link</a>`;
    } else {
        siteLink.textContent = '-';
    }
    // 코드 링크 설정
    const codeLink = modal.querySelector('.code-link');
    if (projectData.codeUrl) {
        codeLink.innerHTML = `<a href="${projectData.codeUrl}" target="_blank">Code Link</a>`;
    } else {
        codeLink.textContent = '-';
    }

    modal.querySelector('.overview').textContent = projectData.overview;
    
    // 메인 기능 목록 생성
    const featuresDiv = modal.querySelector('.main-features');
    featuresDiv.innerHTML = projectData.features.map(feature => 
        `<p>- ${feature}</p>`
    ).join('');

    // 개발 환경 정보 생성
    const envDiv = modal.querySelector('.dev-environment');
    envDiv.innerHTML = Object.entries(projectData.environment).map(([key, value]) => 
        `<p>- ${key}: ${value}</p>`
    ).join('');

    // 모달 표시
    modal.style.display = 'block';
}

// 프로젝트 데이터 예시
function getProjectData(projectId) {
    // 이 부분은 실제 프로젝트 데이터로 채우시면 됩니다
    const projectsData = {
        'bike-emg': {
            title: 'Bike (EMG)',
            site: '',
            codeUrl: 'https://github.com/parkdragonstone/Projects/tree/master/Bike%20(EMG)',
            overview: '20분 간의 자전거 주행에서 근전도로 근육 신호를 측정하고 피로도를 측정',
            features: [
                '측정 도구 : 근전도 센서 (Delsys Trigno)',
                '부착 위치 : Rectus Femoris (RF), Vastus Lateralis (VL), Biceps Femoris (BF), Gasctrocnemuius (GM)',
                '독립 변인 : 자전거 종류, 높이',
                '종속 변인 : 중앙 주파수, 적분근전도 등',
                '통계 : Repeated Measures ANOVA'
            ],
            environment: {
                '언어': 'Python',
                '도구': 'VSCode',
            }
        },
        'fitness': {
            title: 'Fitness',
            site: '',
            codeUrl: 'https://github.com/parkdragonstone/Projects/tree/master/Fitness',
            overview: '스마트 의류에 부착 될 관성 센서를 이용한 파라미터 도출',
            features: [
                '운동 : Cycle, Hiking, Running',
                '파라미터 : 페달링 횟수, 러닝 스텝수, 상체 각도 등'
            ],
            environment: {
                '언어': 'Python',
                '도구': 'VSCode',
            }
        },
        'insole': {
            title: '3D Printing Insole',
            site: '',
            codeUrl: 'https://github.com/parkdragonstone/Projects/tree/master/Insole',
            overview: '3D 프린팅 기술을 통한 맞춤 인솔의 효과 검증',
            features: [
                '동작 : Landing & Stope, Landing & Counter Movement Jump, Single Leg Standing',
                '독립 변인 : 맞춤 인솔의 착용 유무',
                '종속 변인 : COP 움직인 거리, 속도, 면적, 지면 반력',
                '통계 : Paired-T Test, SPM'
            ],
            environment: {
                '언어': 'Python',
                '도구': 'VSCode',
            }
        },
        'shoe-clustering': {
            title: 'Shoe Clustering',
            site: '',
            codeUrl: 'https://github.com/parkdragonstone/Projects/tree/master/Shoe%20Clustering',
            overview: '기계 테스트 결과를 바탕으로 같은 특징이 있는 신발을 군집화',
            features: [
                '데이터 : 신발 기계 테스트 데이터',
                '분석 방법 : PCA, K-means Clustering'
            ],
            environment: {
                '언어': 'Python',
                '도구': 'VSCode',
            }
        },
        'shoulder-rom': {
            title: 'Shoulder ROM',
            site: '',
            codeUrl: 'https://github.com/parkdragonstone/Projects/tree/master/ShoulderROM',
            overview: '다른 시스템 (Marker, Markerless, Pose Estimation) 에서 측정된 어깨 각도 비교',
            features: [
                'Vicon으로 측정된 Trunk, Right Upper Arm 에 부착된 마커를 Transformation Matrix를 계산하고 내적하여 각도를 계산',
                'Thiea로 분석된 Transformation Matrix를 이용한 관절 각도 계산',
                '마커 데이터를 2D 상에서 계산'
            ],
            environment: {
                '언어': 'Python',
                '도구': 'VSCode',
            }
        },
        'y-balance': {
            title: 'Y-Balance',
            site: '',
            codeUrl: 'https://github.com/parkdragonstone/Projects/tree/master/Y-Balance',
            overview: '다른 시스템 (Marker, Markerless, Pose Estimation) 에서 측정된 Y-balance 비교',
            features: [
                '데이터 확인을 위해 파이썬을 이용해 시각화를 진행'
            ],
            environment: {
                '언어': 'Python',
                '도구': 'VSCode',
            }
        },
        'baseball-report': {
            title: 'Baseball Report',
            site: 'https://dashboard-example2.streamlit.app/',
            codeUrl: 'https://github.com/parkdragonstone/BaseBall-Report-Dashboard',
            overview: '3D 모션 캡쳐를 통해 획득한 야구 피칭 데이터의 시각화',
            features: [
                'Streamlit을 활용한 대시보드 구현',
                '선수의 피칭 데이터를 시각화하여 이를 바탕으로 리포트 제공'
            ],
            environment: {
                '언어': 'Python',
                '도구': 'VSCode, Streamlit'
            }
        },
        'mechanical-report': {
            title: 'Mechanical Test Report',
            site: 'https://dashboard-example1.streamlit.app/',
            codeUrl: 'https://github.com/parkdragonstone/Mechanical-Test',
            overview: '신발의 기계테스트의 데이터를 시각화',
            features: [
                'Streamlit을 활용한 대시보드 구현',
                '여러 신발의 데이터를 비교할 수 있으며 이를 바탕으로 리포트 제공',
            ],
            environment: {
                '언어': 'Python',
                '도구': 'VSCode, Streamlit'
            }
        },
    };

    return projectsData[projectId];
}