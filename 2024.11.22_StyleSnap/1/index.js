
// 탭 기능
const tabs = document.querySelectorAll('.tab');
const contents = document.querySelectorAll('.content');
tabs.forEach(tab => {
    tab.addEventListener('click', function () {
    tabs.forEach(t => t.classList.remove('active'));
    contents.forEach(c => c.classList.remove('active'));
    this.classList.add('active');
    document.getElementById(this.dataset.tab).classList.add('active');
    });
});

// 업로드 박스 생성
const createUploadBox = (gridId, prefix, count) => {
    const grid = document.getElementById(gridId);
    for (let i = 1; i <= count; i++) {
    const box = document.createElement('div');
    box.className = 'upload-box';
    
    // 상자 내에 파일 input과 미리보기 이미지를 추가
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.style.display = 'none';

    const span = document.createElement('span');
    span.textContent = `${prefix} ${i} 업로드`;

    box.appendChild(input);
    box.appendChild(span);

    // 상자 클릭 시 input을 클릭하도록 설정
    box.addEventListener('click', function () {
        input.click();
    });

    // 파일 선택 후 이미지 미리보기
    input.addEventListener('change', function () {
        const file = this.files[0];
        if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            box.innerHTML = '';
            box.appendChild(img);
        };
        reader.readAsDataURL(file);
        }
    });

    // 이미지 클릭 시 선택 표시
    box.addEventListener('click', function () {
        const allBoxes = document.querySelectorAll(`#${gridId} .upload-box`);
        allBoxes.forEach(b => b.classList.remove('selected'));
        box.classList.add('selected');
    });

    grid.appendChild(box);
    }
};

// 상의와 하의 업로드 박스 생성
createUploadBox('topGrid', '상의', 8);
createUploadBox('bottomGrid', '하의', 8);

// 조합하기 버튼 클릭 시
document.getElementById('combineButton').addEventListener('click', function () {
    const selectedTop = document.querySelector('#topGrid .upload-box.selected img');
    const selectedBottom = document.querySelector('#bottomGrid .upload-box.selected img');

    const combinedResult = document.getElementById('combinedResult');
    if (selectedTop && selectedBottom) {
    combinedResult.innerHTML = `
        <img src="${selectedTop.src}" alt="조합된 상의" />
        <img src="${selectedBottom.src}" alt="조합된 하의" />
    `;
    } else {
    combinedResult.innerHTML = '<p>상의와 하의를 선택 후 조합 버튼을 눌러주세요!</p>';
    }
});
