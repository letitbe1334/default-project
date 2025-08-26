<template>
  <div class="github-container">
    <div class="github-link-wrapper">
      <a 
        :href="githubRepoUrl" 
        target="_blank" 
        rel="noopener noreferrer" 
        class="github-link-button"
      >
        <svg class="github-icon" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true">
          <path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38C13.71 14.53 16 11.54 16 8c0-4.42-3.58-8-8-8z"></path>
        </svg>
        GitHub 레포지토리 보기
      </a>
    </div>
    <div class="readme-container" v-html="readmeContent" />
  </div>
</template>

<script setup lang="ts">
/******************************
 * #Important 사용하지 않는 로직, 변수 등 선언 X
 *******************************/

/******************************
 * @import_선언
 * TODO 아래 순서에 맞추어 import (각 순서 마다 띄우기)
 *  * 1. Dependency
 *  * 2. Utils
 *  * 3. Types
 *  * 4. Stores
 *  * 5. Vue
 *  * 6. Etc (생길 시 얘기.)
 *******************************/
import { marked } from 'marked';

/******************************
 * @컴포넌트_옵션_선언
 * TODO 이름 정의 (파일 이름 그대로 지정)
 *******************************/
defineOptions({
  name: 'github-page-container'
})

/******************************
 * @Pinia_store_선언
 * TODO 반응형 유지를 위해 storeToRefs 사용 (function은 사용 X)
 *******************************/
/** message 호출 */

/******************************
 * @Emit_선언
 *******************************/

/******************************
 * @Vue_관련_선언 (ex. vue-router)
 *******************************/
const route = useRoute()

/******************************
 * @Interface_선언
 *******************************/

/******************************
 * @inject_선언
 *******************************/
const $language = inject('$language') as GetTranLanguageFunction

/******************************
 * @Props_선언
 * TODO type & default 작성
 *******************************/

/******************************
 * @VModel_선언
 *******************************/

/******************************
 * @Data_선언
 * TODO ref, reactive 사용, 불명확한 단어 사용 X (ex. data, date)
 *******************************/
const readmeContent = ref('')
const githubRepoUrl = ref('')

/******************************
 * @Computed_선언
 *******************************/

/******************************
 * @Watch_선언
 *******************************/

/******************************
 * @Life_cycle_선언
 *******************************/
onMounted(() => {
  init()
})

/******************************
 * @Function_선언
 * TODO function 주석 작성 (asdffunctionannotation 사용)
 *  * arrow function 사용해도 무관
 *******************************/
/******************************
 * TODO (목적): 초기셋팅
 *******************************/
function init() {
  // role setting
  // url setting
  // code setting
  githubRepoUrl.value = `https://github.com/${route.meta.githubOwner}/${route.meta.githubRepo}`
  // list setting
  getReadmeFile()
}
/******************************
 * TODO (목적): 
 * @param (1): 
 * @return (반환): 
 *******************************/
async function getReadmeFile() {
  try {
    const response = await fetch(`https://raw.githubusercontent.com/${route.meta.githubOwner}/${route.meta.githubRepo}/${route.meta.githubBranch}/readme.md`)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // 응답으로 받은 Markdown 텍스트
    const markdownText = await response.text();
    
    // Markdown을 HTML로 변환
    readmeContent.value = await marked.parse(markdownText);

  } catch (error) {
    readmeContent.value = `
      <p>README.md 파일을 불러오지 못했습니다. 다음을 확인해 주세요:</p>
      <ul>
        <li>GitHub 사용자 이름 및 레포지토리 이름이 올바른지</li>
        <li>브랜치 이름이 올바른지 (예: main 또는 master)</li>
        <li>네트워크 연결 상태</li>
      </ul>
    `;
  }
}

/******************************
 * @Provide_선언
 *  ! types 폴더에 type 명시
 *******************************/
</script>

<style lang="scss">
// .github-container h4 {
//   line-height: 1;
//   margin: 15px;
// }
/* Markdown 스타일링 */
.readme-container {
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #f9f9f9;
}
.readme-container h1 {
  font-size: 2em;
  font-weight: 600;
  line-height: 1.25;
  border-bottom: 1px solid #d1d9e0b3
}


/* GitHub 링크 버튼 스타일 (트렌디하게) */
.github-link-wrapper {
  margin-bottom: 10px; /* README 내용과의 간격 */
  text-align: right; /* 버튼을 오른쪽으로 정렬 */
}

.github-link-button {
  display: inline-flex; /* 아이콘과 텍스트를 한 줄에 정렬 */
  align-items: center; /* 수직 중앙 정렬 */
  gap: 8px; /* 아이콘과 텍스트 사이 간격 */
  padding: 5px 10px;
  background-color: #24292e; /* GitHub 브랜드 색상 */
  color: #fff;
  text-decoration: none;
  border-radius: 8px; /* 부드러운 모서리 */
  font-weight: 600; /* 글씨 굵기 */
  font-size: 0.85rem;
  transition: background-color 0.3s ease, transform 0.1s ease; /* 호버 및 클릭 애니메이션 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* 은은한 그림자 */
  cursor: pointer;
}

.github-link-button:hover {
  background-color: #3f4448;
  transform: translateY(-2px); /* 살짝 떠오르는 효과 */
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
}

.github-link-button:active {
  transform: translateY(0); /* 클릭 시 원위치 */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.github-icon {
  fill: currentColor; /* SVG 아이콘 색상을 텍스트 색상과 동일하게 */
  width: 20px;
  height: 20px;
}
</style>