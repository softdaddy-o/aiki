const fs = require('fs');
const path = require('path');
const cp = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const TARGETS = [
    {
        path: 'src/content/news/ko/2026-03-05-microsoft-phi-4-reasoning-vision-15b-hug.md',
        summary: 'Phi-4-Reasoning-Vision-15B는 Phi-4-Reasoning 기반에 SigLIP-2 비전 인코더를 결합한 소형 멀티모달 추론 모델이다.',
        readerValue: '이 글이 해결해주는 문제는 소형 멀티모달 추론 모델이 어디까지 올라왔는지, 그리고 Phi 계열이 실사용 후보로 얼마나 가까워졌는지 빠르게 판단하게 해준다는 점이다.',
    },
    {
        path: 'src/content/news/ko/2026-03-10-bevlm-distilling-semantic-knowledge-from.md',
        summary: '에이전트 메모리 연구가 기존 RAG와 요약 방식의 한계를 어떻게 넘으려 하는지 보여주는 내용이다.',
        readerValue: '이 글이 해결해주는 문제는 에이전트 메모리 설계가 단순 저장이 아니라 장기 작업 성능과 직결된다는 점을 빠르게 읽게 해준다는 데 있다.',
    },
    {
        path: 'src/content/news/ko/2026-03-15-scimdr-benchmarking-and-advancing-scient.md',
        summary: '작은 모델도 확장 전략에 따라 경쟁력을 만들 수 있다는 흐름을 보여주는 연구다.',
        readerValue: '이 글이 해결해주는 문제는 작은 모델도 확장 전략에 따라 경쟁력을 만들 수 있다는 신호를 빠르게 읽게 해준다는 점이다.',
    },
    {
        path: 'src/content/news/ko/2026-03-19-demystifing-video-reasoning.md',
        summary: '비디오와 시각 추론 평가가 결과 점수보다 과정 검증 쪽으로 이동하는 흐름을 짚는 글이다.',
        readerValue: '이 글이 해결해주는 문제는 비디오와 시각 추론 평가가 결과 점수보다 과정 검증 쪽으로 이동하고 있다는 점을 빠르게 파악하게 해준다는 데 있다.',
    },
    {
        path: 'src/content/news/ko/2026-03-20-why-ai-systems-don-t-learn-and-what-to-d.md',
        summary: '프롬프트 설계 도구가 모델 성능 못지않게 실제 사용 경험과 생산성을 바꾸는 축이라는 점을 보여주는 글이다.',
        readerValue: '이 글이 해결해주는 문제는 프롬프트 설계 도구가 모델 성능 못지않게 실제 사용 경험과 생산성을 바꾸는 축이라는 점을 빠르게 읽게 해준다는 데 있다.',
    },
];

for (const target of TARGETS) {
    const filePath = path.join(ROOT, target.path);
    const original = cp.execSync(`git show HEAD:${target.path}`, {
        cwd: ROOT,
        encoding: 'utf8',
    });

    const repaired = original.replace(
        /^summary:\s*"[\s\S]*?"\nsourceUrl:/m,
        `summary: ${JSON.stringify(target.summary)}\nreaderValue: ${JSON.stringify(target.readerValue)}\nsourceUrl:`,
    );

    fs.writeFileSync(filePath, repaired, 'utf8');
}

console.log(`Repaired ${TARGETS.length} file(s).`);
