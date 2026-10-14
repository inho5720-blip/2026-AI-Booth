/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  Gamepad2,
  Brain,
  Orbit,
  Sparkles,
  Copy,
  Check,
  ExternalLink,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Search,
  Palette,
  Code2,
  Download,
  HelpCircle,
  Share2,
  CheckCircle2,
  X,
  Sliders
} from 'lucide-react';

// Categories
export type CategoryKey = 'all' | 'arcade' | 'quiz' | 'sim' | 'custom';

export interface TemplateField {
  key: string;
  label: string;
  sublabel?: string;
  type: 'text' | 'emoji' | 'number' | 'textarea' | 'chips';
  defaultValue: string | number;
  presets?: string[];
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
}

export interface TemplateDef {
  id: string;
  category: CategoryKey;
  categoryLabel: string;
  title: string;
  subtitle: string;
  badge: string;
  emoji: string;
  badgeColor: string;
  desc: string;
  tags: string[];
  fields: TemplateField[];
  generatePrompt: (val: Record<string, any>) => string;
}

// 24 Full Templates
export const ALL_TEMPLATES: TemplateDef[] = [
  // --- 1. 아케이드 & 퍼즐 게임 ---
  {
    id: 'snake',
    category: 'arcade',
    categoryLabel: '아케이드 & 퍼즐',
    title: '스네이크 게임',
    subtitle: '뱀이 밥을 먹으며 길어지는 클래식 아케이드',
    badge: '인기 1위',
    emoji: '🐍',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    desc: '키보드 방향키 또는 스마트폰 화면 가상 D-패드로 조작하며 먹이를 먹고 길어집니다. 모바일과 PC 모두 플레이 가능합니다!',
    tags: ['클래식', '모바일 가상 D-패드', '스마트폰 호환'],
    fields: [
      {
        key: 'playerEmoji',
        label: '주인공 캐릭터 (이모지 1개)',
        sublabel: '화면에서 움직일 주인공 (PC 방향키 & 모바일 가상 패드 터치) 🐶',
        type: 'emoji',
        defaultValue: '🐍',
        presets: ['🐍', '🐶', '🐱', '🐰', '🚀', '🦖', '🤖']
      },
      {
        key: 'targetEmoji',
        label: '먹이 아이템 (이모지 1개)',
        sublabel: '뱀이 먹고 길어질 먹이 이모지는 무엇인가요? 🍎',
        type: 'emoji',
        defaultValue: '🍎',
        presets: ['🍎', '🧀', '💎', '⭐', '🍩', '🍕']
      },
      {
        key: 'lives',
        label: '시작 생명(목숨) 개수',
        sublabel: '벽이나 꼬리에 부딪혔을 때 버틸 수 있는 기회',
        type: 'number',
        defaultValue: 3,
        min: 1,
        max: 10
      },
      {
        key: 'scorePerSuccess',
        label: '1회 성공 시 얻는 점수',
        sublabel: '먹이를 1개 먹을 때마다 올라가는 점수 단위',
        type: 'number',
        defaultValue: 10,
        min: 1,
        max: 100
      },
      {
        key: 'backgroundTheme',
        label: '전체적인 배경 디자인/분위기',
        sublabel: '게임 무대의 분위기를 자유롭게 입력하세요',
        type: 'chips',
        defaultValue: '귀여운 파스텔톤과 반짝이는 별빛',
        presets: ['신비로운 우주 공간 🌌', '깊은 바닷속 🌊', '귀여운 파스텔톤 🌸', '레트로 8비트 아케이드 🕹️', '마법의 숲 🌲']
      }
    ],
    generatePrompt: (v) => `너는 지금부터 천재적인 프론트엔드 개발자야. 내가 요구하는 웹앱을 하나의 HTML 파일(CSS, JS 포함)로 완벽하게 만들어줘. 코드는 복사해서 바로 실행할 수 있어야 해.
- 만들 웹앱 종류: 스네이크 게임 (클래식 뱀 길어지기 아케이드)
- 전체적인 배경 및 디자인 느낌: ${v.backgroundTheme}
- 주인공 캐릭터 형태: ${v.playerEmoji} 이모지로 화면에 표시해. 머리는 이 이모지로, 몸통은 이모지와 어울리는 부드러운 원형 세그먼트로 길어지게 표현해줘.
- 목표물/장애물 형태: ${v.targetEmoji} 이모지로 표시해. 먹이를 먹을 때마다 귀여운 튀는 효과음이나 시각적 파티클 효과를 줘.
- 게임 규칙: 목숨은 ${v.lives}개로 시작하고, 득점 시 ${v.scorePerSuccess}점씩 올라가.
- 추가 조건: 키보드 방향키와 모바일 터치 가상 D-패드 버튼(화면 하단 4방향 버튼)을 반드시 동시 구현하여 스마트폰에서도 완벽히 조작 가능하게 만들고, 게임 오버 시 '다시 하기' 버튼을 만들어줘.`
  },
  {
    id: 'dodge',
    category: 'arcade',
    categoryLabel: '아케이드 & 퍼즐',
    title: '장애물 피하기 게임',
    subtitle: '다가오는 장애물을 점프해서 피하는 액션 러너',
    badge: '스릴 만점',
    emoji: '🏃‍♂️',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
    desc: '다가오는 장애물을 점프(스페이스바 또는 스마트폰 화면 터치 점프 버튼)로 뛰어넘는 러닝 게임입니다. 모바일과 PC 모두 지원합니다.',
    tags: ['점프 액션', '터치 점프 버튼', '모바일 최적화'],
    fields: [
      {
        key: 'playerEmoji',
        label: '주인공 캐릭터 (이모지 1개)',
        sublabel: '달리면서 점프할 주인공 캐릭터 (화면 터치/스페이스바로 점프)',
        type: 'emoji',
        defaultValue: '🏃‍♂️',
        presets: ['🏃‍♂️', '🐱', '🦖', '🚗', '🦸', '🛹']
      },
      {
        key: 'targetEmoji',
        label: '위험한 장애물 (이모지 1개)',
        sublabel: '날아오는 장애물 이모지',
        type: 'emoji',
        defaultValue: '🧱',
        presets: ['🧱', '💣', '🌵', '☄️', '👻', '⚡']
      },
      {
        key: 'lives',
        label: '생명(목숨) 개수',
        sublabel: '장애물에 부딪혀도 견딜 수 있는 횟수',
        type: 'number',
        defaultValue: 3,
        min: 1,
        max: 10
      },
      {
        key: 'scorePerSuccess',
        label: '1회 성공 시 얻는 점수',
        sublabel: '장애물 1개를 피할 때마다 주어지는 점수',
        type: 'number',
        defaultValue: 10,
        min: 1,
        max: 100
      },
      {
        key: 'backgroundTheme',
        label: '전체적인 배경 디자인/분위기',
        sublabel: '러닝 트랙의 배경 무대',
        type: 'chips',
        defaultValue: '화려한 네온 사이버 시티',
        presets: ['화려한 네온 사이버 시티 ⚡', '사탕 과자 나라 🍭', '사막 오아시스 🏜️', '구름 위 하늘나라 ☁️']
      }
    ],
    generatePrompt: (v) => `너는 지금부터 천재적인 프론트엔드 개발자야. 내가 요구하는 웹앱을 하나의 HTML 파일(CSS, JS 포함)로 완벽하게 만들어줘. 코드는 복사해서 바로 실행할 수 있어야 해.
- 만들 웹앱 종류: 장애물 피하기 게임 (횡스크롤 점프 러너)
- 전체적인 배경 및 디자인 느낌: ${v.backgroundTheme}
- 주인공 캐릭터 형태: ${v.playerEmoji} 이모지로 바닥 라인 위에 위치시키고 점프할 때 자연스럽게 공중으로 솟아오르게 해줘.
- 목표물/장애물 형태: ${v.targetEmoji} 이모지가 오른쪽에서 왼쪽으로 빠르게 다가오게 해.
- 게임 규칙: 목숨은 ${v.lives}개로 시작하고, 득점 시 ${v.scorePerSuccess}점씩 올라가.
- 추가 조건: 키보드 스페이스바뿐만 아니라 화면 하단에 엄지손가락으로 쉽게 누를 수 있는 큼직한 [점프 ⬆️] 모바일 가상 터치 버튼을 반드시 제공하고, 화면 전체 탭으로도 2단 점프까지 가능하게 만들어줘. 스마트폰 세로 화면에서도 횡스크롤 트랙이 시원하게 보이도록 반응형 비율을 맞춰줘.`
  },
  {
    id: 'memory-card',
    category: 'arcade',
    categoryLabel: '아케이드 & 퍼즐',
    title: '카드 뒤집기 메모리 게임',
    subtitle: '두 장의 카드를 뒤집어 같은 그림의 짝을 맞추는 기억력 게임',
    badge: '선생님 예시',
    emoji: '❓',
    badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    desc: '카드를 터치하여 짝을 맞추는 기억력 게임! 스마트폰 화면 비율에 맞춰 카드가 보기 좋게 자동 배열됩니다.',
    tags: ['기억력', '반응형 터치 카드', '두뇌 훈련'],
    fields: [
      {
        key: 'cardBackDesign',
        label: '카드 뒷면 디자인',
        sublabel: '카드가 엎어져 있을 때 보일 뒷면 스타일이나 이모지',
        type: 'chips',
        defaultValue: '호기심 가득 물음표 카드 ❓',
        presets: ['호기심 가득 물음표 카드 ❓', '신비로운 마법 문양 🔮', '황금빛 별 패턴 ⭐', '레트로 체크무늬 🏁', '단색 깔끔한 민트 블루 🟦']
      },
      {
        key: 'pairTheme',
        label: '짝을 맞출 이모지 테마',
        sublabel: '카드 앞면에 등장할 이모지 세트 종류',
        type: 'chips',
        defaultValue: '귀여운 동물 친구들 (🐶🐱🐰🐼🦁🦊)',
        presets: ['귀여운 동물 친구들 (🐶🐱🐰🐼🦁🦊)', '맛있는 과일 디저트 (🍎🍓🍌🍩🍰🍦)', '신비한 우주 천체 (🚀🪐🌍☀️🌙☄️)', '세계 국기 여행 (🇰🇷🇺🇸🇯🇵🇬🇧🇫🇷🇩🇪)']
      },
      {
        key: 'gridDifficulty',
        label: '게임 난이도 (카드 격자 배열)',
        sublabel: '스마트폰과 PC 화면에 맞춰 카드 크기가 자동으로 조정되는 반응형 격자',
        type: 'chips',
        defaultValue: '4x4 배열 (총 16장, 8쌍 - 표준)',
        presets: ['3x4 배열 (총 12장, 6쌍 - 모바일 추천)', '4x4 배열 (총 16장, 8쌍 - 표준)', '6x6 배열 (총 36장, 18쌍 - 고난도)']
      },
      {
        key: 'timeLimit',
        label: '시간 제한 유무 및 제한 시간',
        sublabel: '타이머가 0이 되면 게임 오버 여부',
        type: 'chips',
        defaultValue: '60초 시간 제한 (긴장감 넘치는 카운트다운)',
        presets: ['시간 제한 없음 (편안한 연습 모드)', '45초 시간 제한 (짜릿한 스피드)', '60초 시간 제한 (표준)', '90초 시간 제한 (여유)']
      }
    ],
    generatePrompt: (v) => `너는 지금부터 천재적인 프론트엔드 개발자야. 내가 요구하는 웹앱을 하나의 HTML 파일(CSS, JS 포함)로 완벽하게 만들어줘. 코드는 복사해서 바로 실행할 수 있어야 해.
- 만들 웹앱 종류: 카드 뒤집기 메모리 게임 (Memory Card Matching)
- 카드 뒷면 디자인: ${v.cardBackDesign}
- 짝을 맞출 이모지 테마: ${v.pairTheme}
- 게임 난이도 (배열): ${v.gridDifficulty} (스마트폰 세로 화면에서도 카드가 겹치거나 화면 밖으로 넘치지 않고 엄지손가락으로 탭하기 편한 크기로 반응형 CSS Grid 맞춤)
- 시간 제한 규칙: ${v.timeLimit}
- 시각 효과: 카드를 누르면 3D 플립 애니메이션(flip effect)으로 뒤집히고, 짝이 맞으면 통통 튀며 반짝이 효과를 줘. 틀리면 살짝 흔들리며 다시 뒤집혀.
- 추가 조건: 상단에 시도 횟수, 경과 시간, 맞춘 짝 개수를 표시하고 성공 시 축하 꽃가루(confetti) 애니메이션과 '다시 하기' 버튼을 만들어줘.`
  },
  {
    id: 'rps',
    category: 'arcade',
    categoryLabel: '아케이드 & 퍼즐',
    title: '가위바위보 게임 만들기',
    subtitle: '나만의 캐릭터와 독창적인 상성 룰로 즐기는 대결',
    badge: '선생님 예시',
    emoji: '✌️',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    desc: '컴퓨터와 두뇌 싸움을 벌이는 가위바위보! 스마트폰 한 손 엄지손가락으로 탭하기 편한 대형 선택 버튼을 제공합니다.',
    tags: ['심리전', '모바일 원터치', '커스텀 룰'],
    fields: [
      {
        key: 'opponentEmoji',
        label: '상대방(컴퓨터) 캐릭터 이모지',
        sublabel: '나와 대결할 컴퓨터 AI의 마스코트',
        type: 'emoji',
        defaultValue: '🤖',
        presets: ['🤖', '👽', '🦖', '🧙‍♂️', '👾', '🦊']
      },
      {
        key: 'winCondition',
        label: '승리 조건',
        sublabel: '게임의 매치 방식',
        type: 'chips',
        defaultValue: '3판 2선승제 (토너먼트)',
        presets: ['단판 승부 (한 방에 결정)', '3판 2선승제 (표준)', '5판 3선승제', '무한 서바이벌 (연승 기록 깨기)']
      },
      {
        key: 'customElements',
        label: '가위바위보 대체 상성 (나만의 3원소)',
        sublabel: '전통 가위바위보 대신 사용할 나만의 상성 요소',
        type: 'chips',
        defaultValue: '불🔥 > 풀🌿 > 물💧 > 불🔥',
        presets: ['기본 가위✌️, 바위✊, 보🖐️', '불🔥 > 풀🌿 > 물💧 > 불🔥', '마법사🧙 > 기사⚔️ > 도적🏹 > 마법사🧙', '빛☀️ > 어둠🌙 > 혼돈⚡ > 빛☀️']
      },
      {
        key: 'screenEffects',
        label: '승리/패배 시 화면 효과',
        sublabel: '결과가 나왔을 때의 액션 연출',
        type: 'chips',
        defaultValue: '승리 시 축하 꽃가루 폭죽, 패배 시 화면 흔들림과 흑백 전환',
        presets: ['승리 시 축하 꽃가루 폭죽, 패배 시 화면 흔들림과 흑백 전환', '화려한 네온 레이저 파티클', '만화풍 코믹 대사 팝업', '화면 번쩍임과 역동적인 사운드 비주얼']
      }
    ],
    generatePrompt: (v) => `너는 지금부터 천재적인 프론트엔드 개발자야. 내가 요구하는 웹앱을 하나의 HTML 파일(CSS, JS 포함)로 완벽하게 만들어줘. 코드는 복사해서 바로 실행할 수 있어야 해.
- 만들 웹앱 종류: 인터랙티브 가위바위보 대결 게임
- 상대방(컴퓨터) 캐릭터: ${v.opponentEmoji} 이모지로 상단에서 표정이 바뀌며(생각 중, 승리, 패배) 살아있는 것처럼 표현해줘.
- 승리 조건 및 매치 방식: ${v.winCondition}
- 상성 규칙: ${v.customElements} 규칙을 적용하고, 화면에 상성 안내 다이어그램을 보기 쉽게 보여줘.
- 승패 연출 효과: ${v.screenEffects}
- 추가 조건: 스마트폰 한 손으로도 탭하기 쉬운 큼직한 3개 선택 버튼(최소 높이 56px 이상)을 화면 하단에 나란히 배치하고, 누르면 3-2-1 카운트다운 후 패를 공개하도록 스릴 넘치게 구성해줘.`
  },
  {
    id: 'fall-dodge',
    category: 'arcade',
    categoryLabel: '아케이드 & 퍼즐',
    title: '하늘에서 떨어지는 장애물 피하기',
    subtitle: '하늘에서 쏟아지는 위험 물질을 좌우로 재빠르게 회피',
    badge: '추천 게임',
    emoji: '☄️',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
    desc: '하늘에서 낙하하는 장애물을 피하는 게임! PC 좌우 키 또는 스마트폰 화면 좌/우 터치 버튼으로 손쉽게 조작할 수 있습니다.',
    tags: ['낙하물 회피', '좌우 터치 버튼', '모바일 최적화'],
    fields: [
      {
        key: 'playerEmoji',
        label: '플레이어 캐릭터 이모지',
        sublabel: '바닥에서 좌우로 이동할 나의 캐릭터 (PC 키보드 & 모바일 좌우 터치 버튼)',
        type: 'emoji',
        defaultValue: '🐱',
        presets: ['🐱', '🐶', '🚀', '🏃‍♂️', '🐧', '🦸']
      },
      {
        key: 'obstacleEmoji',
        label: '떨어지는 장애물 이모지',
        sublabel: '하늘에서 비처럼 쏟아질 위험 요소',
        type: 'emoji',
        defaultValue: '☄️',
        presets: ['☄️', '💩', '💣', '⚡', '🧱', '🌧️']
      },
      {
        key: 'bonusItem',
        label: '가끔 떨어지는 보너스 아이템 및 효과',
        sublabel: '피하지 않고 먹어야 하는 특별 아이템',
        type: 'chips',
        defaultValue: '황금 별⭐ (3초간 무적 방어막 + 점수 2배)',
        presets: ['황금 별⭐ (3초간 무적 방어막 + 점수 2배)', '하트❤️ (생명 +1 회복)', '시계⏰ (5초간 장애물 속도 50% 둔화)', '자석🧲 (주변 점수 코인 흡수)']
      },
      {
        key: 'bgVibe',
        label: '배경 분위기',
        sublabel: '하늘과 지면의 그래픽 무드',
        type: 'chips',
        defaultValue: '은하수가 흐르는 신비로운 밤하늘 🌌',
        presets: ['은하수가 흐르는 신비로운 밤하늘 🌌', '물방울이 솟아오르는 깊은 바닷속 🌊', '안개 낀 울창한 요정의 숲 🌲', '비 내리는 사이버펑크 도시 🏙️']
      }
    ],
    generatePrompt: (v) => `너는 지금부터 천재적인 프론트엔드 개발자야. 내가 요구하는 웹앱을 하나의 HTML 파일(CSS, JS 포함)로 완벽하게 만들어줘. 코드는 복사해서 바로 실행할 수 있어야 해.
- 만들 웹앱 종류: 하늘에서 떨어지는 장애물 피하기 (Falling Avoidance Game)
- 플레이어 캐릭터: ${v.playerEmoji} (키보드 좌우 방향키뿐만 아니라 화면 하단에 큼직한 [◀ 좌], [우 ▶] 모바일 가상 터치 버튼을 필수로 제공해줘)
- 떨어지는 장애물: ${v.obstacleEmoji} 이모지가 상단 랜덤 위치에서 다양한 속도로 낙하
- 보너스 아이템 및 특수 효과: ${v.bonusItem}
- 배경 디자인: ${v.bgVibe}
- 규칙: 목숨 3개, 장애물에 닿으면 깜빡이며 무적 시간 1초 부여, 시간이 지날수록 낙하 속도가 점진적으로 빨라짐.
- 추가 조건: 상단에 점수와 남은 목숨을 예쁘게 표시하고, 최고 점수(HighScore) 로컬 저장 및 스마트폰 세로 화면 비율에 최적화된 반응형 캔버스로 '다시 하기' 버튼을 구현해줘.`
  },
  {
    id: 'roulette-pinball',
    category: 'arcade',
    categoryLabel: '아케이드 & 퍼즐',
    title: '핀볼형 랜덤 뽑기 / 룰렛',
    subtitle: '두근두근 랜덤 추첨! 회전판과 핀볼 물리 효과로 뽑기',
    badge: '행사 필수',
    emoji: '🎡',
    badgeColor: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    desc: '축제 부스 경품 추첨, 오늘 뭐 먹지 결정 등 스마트폰 화면 터치 한 번으로 즐기는 인터랙티브 랜덤 뽑기 웹앱입니다.',
    tags: ['룰렛', '핀볼', '모바일 터치 추첨', '파티'],
    fields: [
      {
        key: 'drawMethod',
        label: '뽑기 방식',
        sublabel: '당첨자를 결정하는 애니메이션 방식',
        type: 'chips',
        defaultValue: '회전하는 화려한 원형 룰렛 (Spin Wheel)',
        presets: ['회전하는 화려한 원형 룰렛 (Spin Wheel)', '위에서 장애물 못을 튕기며 떨어지는 핀볼 드롭 방식', '통통 튀는 캡슐 뽑기 머신 (Gachapon)']
      },
      {
        key: 'itemChoices',
        label: '결과물 목록 (콤마 , 로 구분)',
        sublabel: '선택지에 들어갈 후보들을 적어주세요',
        type: 'textarea',
        defaultValue: '과학 도서 상품권, 1등급 우주 젤리, 과학 키트, 꽝(다시 도전!), 축제 배지, 즉석 사진 촬영권'
      },
      {
        key: 'pointerStyle',
        label: '공 / 포인터의 색상 또는 이모지',
        sublabel: '당첨 위치를 가리킬 표시',
        type: 'chips',
        defaultValue: '황금 화살표 🎯 (또는 네온 핑크 침)',
        presets: ['황금 화살표 🎯 (또는 네온 핑크 침)', '빛나는 별 포인터 ⭐', '반짝이는 크리스탈 핀볼 🔮', '익살스러운 손가락 👆']
      },
      {
        key: 'winFeedback',
        label: '당첨 시 나오는 시각/사운드 느낌',
        sublabel: '추첨이 완료되었을 때의 축하 분위기',
        type: 'chips',
        defaultValue: '화려한 축하 빵빠레와 화면 가득 터지는 꽃가루 폭죽 🎉',
        presets: ['화려한 축하 빵빠레와 화면 가득 터지는 꽃가루 폭죽 🎉', '맑고 청아한 띠링~ 벨소리와 황금빛 아우라 ✨', '신나는 아케이드 축하 연출 🎊']
      }
    ],
    generatePrompt: (v) => `너는 지금부터 천재적인 프론트엔드 개발자야. 내가 요구하는 웹앱을 하나의 HTML 파일(CSS, JS 포함)로 완벽하게 만들어줘. 코드는 복사해서 바로 실행할 수 있어야 해.
- 만들 웹앱 종류: 인터랙티브 랜덤 뽑기 / 룰렛 웹앱
- 뽑기 방식: ${v.drawMethod}
- 항목 목록: [${v.itemChoices}] (각 항목을 알록달록한 섹터로 균등 분할하고 텍스트 표시)
- 포인터 / 공 디자인: ${v.pointerStyle}
- 당첨 연출: ${v.winFeedback} (당첨 항목을 큰 모달 카드로 띄우고 강조)
- 추가 조건: 스마트폰 한 손으로도 탭하기 쉬운 초대형 [돌리기 (SPIN 🎲)] 터치 버튼을 하단에 두고, 부드럽게 감속하며 멈추는 리얼한 물리 감속 애니메이션을 구현하고 결과 목록 추가/삭제 간이 폼도 모바일 반응형으로 제공해줘.`
  },
  {
    id: 'escape-room',
    category: 'arcade',
    categoryLabel: '아케이드 & 퍼즐',
    title: '방탈출 비밀번호 추리 게임',
    subtitle: '밀실 속 숨겨진 단서를 조합해 탈출 암호를 해독',
    badge: '추리 퍼즐',
    emoji: '🔐',
    badgeColor: 'bg-slate-200 text-slate-800 border-slate-300',
    desc: '화면 곳곳을 터치하여 힌트를 수집하고 스마트폰 가상 숫자 키패드로 암호를 풀어 탈출하는 두뇌 추리 게임입니다.',
    tags: ['추리', '터치 키패드', '단서 수집', '방탈출'],
    fields: [
      {
        key: 'roomTheme',
        label: '방탈출 테마',
        sublabel: '탈출해야 할 무대의 스토리와 분위기',
        type: 'chips',
        defaultValue: '고장난 우주 탐사선 연구실 (AI 오작동) 🚀',
        presets: ['고장난 우주 탐사선 연구실 (AI 오작동) 🚀', '으스스한 100년 된 마법사의 비밀 방 🧙‍♂️', '비밀 요원의 암호 연구소 🕵️', '고대 피라미드 파라오의 보물실 🏺']
      },
      {
        key: 'passwordType',
        label: '비밀번호 타입',
        sublabel: '도어락에 입력할 암호 형식 (모바일 터치 키패드 지원)',
        type: 'chips',
        defaultValue: '숫자 4자리 암호 (예: 2 0 4 8)',
        presets: ['숫자 4자리 암호 (예: 2 0 4 8)', '영문 4글자 키워드 (예: S T A R)', '3자리 색상 조합 (빨강-초록-파랑)', '방향키 4단계 시퀀스 (↑ → ↓ ←)']
      },
      {
        key: 'clueEmojis',
        label: '화면에 숨겨둘 힌트 오브젝트 3가지',
        sublabel: '터치/클릭 시 단서가 나타날 사물들',
        type: 'chips',
        defaultValue: '낡은 일기장 📖, 깨진 컴퓨터 화면 💻, 벽에 걸린 천체도 🌌',
        presets: ['낡은 일기장 📖, 깨진 컴퓨터 화면 💻, 벽에 걸린 천체도 🌌', '신비한 물약병 🧪, 괘종시계 🕰️, 마법 거울 🪞', '금고 🗄️, 쪽지 📜, 열쇠구멍 🗝️']
      },
      {
        key: 'failPenalty',
        label: '오답 실패 시 페널티 효과',
        sublabel: '틀린 암호를 입력했을 때의 긴장감 연출',
        type: 'chips',
        defaultValue: '경고음과 함께 화면이 붉게 깜빡이고 남은 기회 차감',
        presets: ['경고음과 함께 화면이 붉게 깜빡이고 남은 기회 차감', '화면 진동과 함께 서늘한 텍스트 팝업', '제한 시간 10초 즉시 차감']
      }
    ],
    generatePrompt: (v) => `너는 지금부터 천재적인 프론트엔드 개발자야. 내가 요구하는 웹앱을 하나의 HTML 파일(CSS, JS 포함)로 완벽하게 만들어줘. 코드는 복사해서 바로 실행할 수 있어야 해.
- 만들 웹앱 종류: 인터랙티브 미니 방탈출 비밀번호 추리 게임
- 스토리 테마: ${v.roomTheme}
- 암호 체계: ${v.passwordType}
- 숨겨진 단서 오브젝트: ${v.clueEmojis} (화면에 배치되어 터치/클릭 시 단서 팝업 오픈)
- 실패 시 연출: ${v.failPenalty}
- 승리 연출: 올바른 암호 입력 시 문이 활짝 열리는 애니메이션과 탈출 성공 기념 배지 수여.
- 추가 조건: 스마트폰 화면에서도 손가락으로 누르기 편한 모바일 전용 가상 디지털 키패드(0~9 터치 버튼)를 하단에 제공하고, 세로 모드 화면에 깔끔하게 맞춘 몰입감 넘치는 인터페이스를 구현해줘.`
  },
  {
    id: 'clicker',
    category: 'arcade',
    categoryLabel: '아케이드 & 퍼즐',
    title: '무한 클릭커 (노가다) 게임',
    subtitle: '클릭할 때마다 커지고 진화하는 중독성 만점 탭 게임',
    badge: '중독성 최고',
    emoji: '🍪',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    desc: '화면 중앙의 이모지를 폭풍 클릭 또는 모바일 화면 탭(Tap)하여 점수를 모으고 무한 성장하세요! 멀티 터치를 지원합니다.',
    tags: ['클릭커', '모바일 탭 최적화', '성장', '피젯'],
    fields: [
      {
        key: 'mainEmoji',
        label: '클릭할 중앙의 거대한 메인 이모지',
        sublabel: '화면 한가운데에서 두들겨 맞을 마스코트',
        type: 'emoji',
        defaultValue: '🍪',
        presets: ['🍪', '👾', '🧪', '💎', '🐣', '🍕']
      },
      {
        key: 'clickPower',
        label: '1회 클릭/탭 시 올라가는 기본 점수 단위',
        sublabel: '클릭 및 화면 터치당 포인트',
        type: 'number',
        defaultValue: 1,
        min: 1,
        max: 50
      },
      {
        key: 'evolutionStages',
        label: '특정 점수 도달 시 변하는 이모지 진화 모습',
        sublabel: '점수가 쌓이면 더 멋진 모습으로 변신합니다',
        type: 'chips',
        defaultValue: '100점: 황금쿠키 🥠 -> 500점: 거대 케이크 🎂 -> 2000점: 우주 별사탕 ⭐',
        presets: ['100점: 황금쿠키 🥠 -> 500점: 거대 케이크 🎂 -> 2000점: 우주 별사탕 ⭐', '100점: 아기 몬스터 👾 -> 500점: 성체 드래곤 🐉 -> 2000점: 전설의 불사조 🦅', '100점: 구리 원석 🪨 -> 500점: 반짝이는 금괴 🪙 -> 2000점: 영롱한 다이아몬드 💎']
      },
      {
        key: 'cursorParticles',
        label: '마우스 클릭/모바일 터치 이펙트',
        sublabel: '화면을 탭할 때마다 튀어나오는 시각 파티클',
        type: 'chips',
        defaultValue: '터치/클릭 지점에서 숫자(+1, +10)와 함께 퐁퐁 솟아오르는 별가루 파티클 ✨',
        presets: ['터치/클릭 지점에서 숫자(+1, +10)와 함께 퐁퐁 솟아오르는 별가루 파티클 ✨', '빵빵 터지는 하트 폭탄 ❤️', '통통 튀는 동전 튕김 효과 🪙', '화려한 번개 스파크 ⚡']
      }
    ],
    generatePrompt: (v) => `너는 지금부터 천재적인 프론트엔드 개발자야. 내가 요구하는 웹앱을 하나의 HTML 파일(CSS, JS 포함)로 완벽하게 만들어줘. 코드는 복사해서 바로 실행할 수 있어야 해.
- 만들 웹앱 종류: 무한 방치형 클릭커(Clicker) 웹앱
- 메인 클릭 타겟: ${v.mainEmoji} (화면 중앙에 아주 크게 표시, 클릭 및 모바일 탭 시 쫀득하게 눌렸다 튀어오르는 스케일 애니메이션 적용)
- 클릭/탭 점수: 기본 +${v.clickPower}점
- 진화 시스템: ${v.evolutionStages}
- 파티클 연출: ${v.cursorParticles}
- 모바일 최적화: 스마트폰에서 두 손가락으로 빠르게 연타(멀티 탭)해도 브라우저 확대가 되지 않도록 touch-action manipulation 스타일을 넣고, 하단에 [자동 클릭 로봇], [강화 장갑] 등의 구매 버튼을 엄지손가락으로 탭하기 편한 카드로 배치해줘.`
  },

  // --- 2. 퀴즈 & 두뇌 훈련 ---
  {
    id: 'estimation',
    category: 'quiz',
    categoryLabel: '퀴즈 & 두뇌 훈련',
    title: '어림값 계산기 만들기',
    subtitle: '직관적인 감각으로 사물의 무게나 거리를 예측하는 수학 챌린지',
    badge: '선생님 예시',
    emoji: '⚖️',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    desc: '수학적 직관력 쑥쑥! 실제 값에 얼마나 가깝게 맞추는지 오차 범위를 측정해 정답을 맞혀보세요.',
    tags: ['수학', '어림잡기', '과학 감각', '초중등 추천'],
    fields: [
      {
        key: 'targetItem',
        label: '어림잡을 대상과 단위',
        sublabel: '무엇을 예측하게 할까요?',
        type: 'chips',
        defaultValue: '마트 장바구니에 담긴 물건들의 총 금액 (원)',
        presets: ['마트 장바구니에 담긴 물건들의 총 금액 (원)', '코끼리와 사자의 몸무게 (kg)', '서울에서 부산, 지구에서 달까지의 거리 (km)', '수조에 담긴 물의 부피 (L)']
      },
      {
        key: 'themeVibe',
        label: '테마 및 배경 그래픽',
        sublabel: '퀴즈가 진행될 가상 환경',
        type: 'chips',
        defaultValue: '신나는 스마트 마트 계산대 🛒',
        presets: ['신나는 스마트 마트 계산대 🛒', '우주 화물선 적재 도크 🚀', '신비한 동물원 사파리 🐘', '과학 실험실 정밀 저울 🔬']
      },
      {
        key: 'toleranceRange',
        label: '정답 인정 허용 오차 범위',
        sublabel: '얼마나 근접해야 정답으로 인정할지',
        type: 'chips',
        defaultValue: '±10% 이내 (참 잘했어요 등급)',
        presets: ['±5% 이내 (신의 직관 - 완벽!)', '±10% 이내 (참 잘했어요 등급)', '±20% 이내 (너그러운 초보자용)']
      },
      {
        key: 'praiseComment',
        label: '정답 근접 시 칭찬 멘트 스타일',
        sublabel: '결과 화면에 띄울 재치있는 피드백',
        type: 'chips',
        defaultValue: '인간 저울 탄생! AI보다 정확한 직관력입니다! 🎯',
        presets: ['인간 저울 탄생! AI보다 정확한 직관력입니다! 🎯', '천재 수학자의 눈썰미를 가지셨군요! 🌟', '놀라운 어림 실력! 장보기의 달인입니다! 👏']
      }
    ],
    generatePrompt: (v) => `너는 지금부터 천재적인 프론트엔드 개발자야. 내가 요구하는 웹앱을 하나의 HTML 파일(CSS, JS 포함)로 완벽하게 만들어줘. 코드는 복사해서 바로 실행할 수 있어야 해.
- 만들 웹앱 종류: 어림값(Estimation) 맞추기 수학 직관 훈련 웹앱
- 문제 주제 및 단위: ${v.targetItem}
- 배경 및 테마: ${v.themeVibe}
- 정답 인정 오차 범위: ${v.toleranceRange}
- 결과 피드백 멘트: ${v.praiseComment}
- 진행 방식: 무작위 상황(예: 물건 3~4개의 가격 합계)을 제시하고, 슬라이더 바 또는 숫자 입력창으로 사용자가 어림값을 제출하면 실제 정답과의 오차(%)를 시각적 게이지 그래프로 보여줘.`
  },
  {
    id: 'vocab-quiz',
    category: 'quiz',
    categoryLabel: '퀴즈 & 두뇌 훈련',
    title: '영어 단어 퀴즈 게임',
    subtitle: '스피드와 정확성을 겨루는 재미있는 영단어 맞추기',
    badge: '선생님 예시',
    emoji: '🔤',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
    desc: '단어와 그림을 보고 알맞은 뜻이나 철자를 맞추는 스피드 퀴즈! 연속 콤보로 최고 점수를 노려보세요.',
    tags: ['영어', '단어 퀴즈', '스피드런', '학습'],
    fields: [
      {
        key: 'quizTopic',
        label: '퀴즈 주제 테마',
        sublabel: '출제될 영단어 카테고리',
        type: 'chips',
        defaultValue: '귀여운 동물과 자연 (Lion, Whale, Forest 등)',
        presets: ['귀여운 동물과 자연 (Lion, Whale, Forest 등)', '맛있는 음식과 디저트 (Apple, Pizza, Cookie 등)', '신비한 과학과 우주 (Planet, Gravity, Robot 등)', '학교와 일상 생활 (Pencil, Friend, Music 등)']
      },
      {
        key: 'questionFormat',
        label: '문제 출제 및 답변 방식',
        sublabel: '참가자가 문제를 푸는 UI 형태',
        type: 'chips',
        defaultValue: '객관식 4지선다 알록달록 버튼 클릭 방식',
        presets: ['객관식 4지선다 알록달록 버튼 클릭 방식', '직접 알파벳 스펠링 타이핑하기', '단어 카드 짝맞추기 드래그 앤 드롭']
      },
      {
        key: 'timePerQuestion',
        label: '문제당 제한 시간 (초 단위)',
        sublabel: '초 단위 카운트다운 게이지',
        type: 'chips',
        defaultValue: '문제당 10초 스피드 타이머',
        presets: ['문제당 7초 (짜릿한 긴장감)', '문제당 10초 (표준)', '문제당 15초 (차분한 초보자용)', '무제한 시간']
      },
      {
        key: 'wrongReaction',
        label: '오답 시 캐릭터 반응 및 효과',
        sublabel: '틀렸을 때 보여줄 재미있는 연출',
        type: 'chips',
        defaultValue: '식은땀 흘리는 앵무새 🦜 이모지와 화면 부르르 진동',
        presets: ['식은땀 흘리는 앵무새 🦜 이모지와 화면 부르르 진동', '눈물 찔끔 흘리는 고양이 😿와 오답 해설 팝업', '화면 살짝 붉어짐과 정답 단어 깜빡임']
      }
    ],
    generatePrompt: (v) => `너는 지금부터 천재적인 프론트엔드 개발자야. 내가 요구하는 웹앱을 하나의 HTML 파일(CSS, JS 포함)로 완벽하게 만들어줘. 코드는 복사해서 바로 실행할 수 있어야 해.
- 만들 웹앱 종류: 인터랙티브 스피드 영단어 퀴즈 웹앱
- 단어 주제: ${v.quizTopic} (최소 10개 이상의 다채로운 단어 내장)
- 출제 방식: ${v.questionFormat}
- 시간 제한: ${v.timePerQuestion} (줄어드는 프로그레스 바 표시)
- 오답 연출: ${v.wrongReaction}
- 연속 콤보 시스템: 연속 정답 시 '2 COMBO!', 'FEVER!' 텍스트와 보너스 점수 지급, 최종 점수 카드 및 복습 리스트 출력.`
  },
  {
    id: 'ox-quiz',
    category: 'quiz',
    categoryLabel: '퀴즈 & 두뇌 훈련',
    title: '내가 만드는 넌센스 OX 퀴즈',
    subtitle: '배꼽 잡는 유머와 기발한 상식의 OX 스피드 배틀',
    badge: '선생님 예시',
    emoji: '⭕',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    desc: '사회자 캐릭터의 익살스러운 진행과 함께 상식과 넌센스를 넘나드는 O/X 선택 퀴즈를 즐겨보세요.',
    tags: ['OX 퀴즈', '넌센스', '웃음 보장', '파티'],
    fields: [
      {
        key: 'mcEmoji',
        label: '진행자(사회자) 캐릭터 이모지',
        sublabel: '퀴즈를 내는 MC 마스코트',
        type: 'emoji',
        defaultValue: '🦉',
        presets: ['🦉', '👨‍🏫', '🧙‍♂️', '🤖', '🦊', '🎩']
      },
      {
        key: 'oxButtonStyle',
        label: 'O와 X 버튼의 디자인 스타일',
        sublabel: '누르고 싶게 생긴 매력적인 버튼 UI',
        type: 'chips',
        defaultValue: '초록 네온 O ⭕ vs 강렬한 붉은 네온 X ❌ 3D 버튼',
        presets: ['초록 네온 O ⭕ vs 강렬한 붉은 네온 X ❌ 3D 버튼', '레트로 픽셀 아케이드 아날로그 버튼', '부드러운 파스텔톤 커다란 원형 카드']
      },
      {
        key: 'bgReaction',
        label: '정답 입력 시 배경 및 시각 변화',
        sublabel: '버튼을 눌렀을 때 즉각적인 색상 반응',
        type: 'chips',
        defaultValue: '정답이면 화면 전체가 화사한 초록빛 환호, 오답이면 깜빡이는 주황빛',
        presets: ['정답이면 화면 전체가 화사한 초록빛 환호, 오답이면 깜빡이는 주황빛', '만화풍 대형 O / X 워터마크 슬라이드', '화려한 파티클과 효과음 비주얼']
      },
      {
        key: 'totalQuestions',
        label: '전체 문제 수 및 최종 점수 표시',
        sublabel: '퀴즈 볼륨과 평가 기준',
        type: 'chips',
        defaultValue: '총 5문제 (상식 3개 + 넌센스 2개, 100점 만점 평가)',
        presets: ['총 5문제 (가볍고 빠른 진행)', '총 10문제 (정통 퀴즈 쇼)', '무한 서바이벌 모드 (틀릴 때까지 전진)']
      }
    ],
    generatePrompt: (v) => `너는 지금부터 천재적인 프론트엔드 개발자야. 내가 요구하는 웹앱을 하나의 HTML 파일(CSS, JS 포함)로 완벽하게 만들어줘. 코드는 복사해서 바로 실행할 수 있어야 해.
- 만들 웹앱 종류: 신나는 인터랙티브 OX 퀴즈 쇼 웹앱
- 진행자 캐릭터: ${v.mcEmoji} (말풍선으로 문제를 읽어주고 맞히면 칭찬, 틀리면 위로해줌)
- O/X 버튼 디자인: ${v.oxButtonStyle}
- 배경 인터랙션: ${v.bgReaction}
- 문항 구성: ${v.totalQuestions}
- 추가 조건: 상단에 진행 상황(예: 3/5)과 점수판을 두고, 퀴즈가 끝나면 최종 칭호(예: '상식의 달인', '넌센스 박사')를 멋진 인증서 카드로 출력해줘.`
  },
  {
    id: 'block-guess',
    category: 'quiz',
    categoryLabel: '퀴즈 & 두뇌 훈련',
    title: '쌓기나무 입체도형 추측 게임',
    subtitle: '위/앞/옆에서 본 단면을 보고 진짜 입체 블록 개수 맞히기',
    badge: '선생님 예시',
    emoji: '🧱',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    desc: '공간지각력의 핵심! 위, 앞, 옆 투영도를 관찰하여 쌓여있는 블록의 총 개수나 숨겨진 블록을 맞혀보세요.',
    tags: ['공간지각력', '수학 입체도형', '3D 관찰', '초등 추천'],
    fields: [
      {
        key: 'viewAngles',
        label: '보여줄 시점 단면도',
        sublabel: '힌트로 제공할 뷰',
        type: 'chips',
        defaultValue: '위에서 본 모양 + 앞에서 본 모양 + 옆에서 본 모양 (3면 투영도)',
        presets: ['위에서 본 모양 + 앞에서 본 모양 + 옆에서 본 모양 (3면 투영도)', '아이소메트릭(사선 3D 입체) 회전 뷰', '위에서 본 모양에 층수 숫자가 적힌 격자']
      },
      {
        key: 'blockTexture',
        label: '나무 블록의 색상 및 질감',
        sublabel: '블록 그래픽의 재질 느낌',
        type: 'chips',
        defaultValue: '따뜻한 내추럴 원목 블록 🪵',
        presets: ['따뜻한 내추럴 원목 블록 🪵', '알록달록 레고 플라스틱 블록 (빨/노/파/초) 🧱', '투명한 크리스탈 유리 큐브 🧊']
      },
      {
        key: 'maxBlocks',
        label: '최대 블록 개수 (난이도)',
        sublabel: '쌓을 블록의 규모',
        type: 'chips',
        defaultValue: '5~10개 (초등 중학년 표준 난이도)',
        presets: ['3~5개 (초보자 입문용)', '5~10개 (초등 중학년 표준 난이도)', '11~18개 (영재 두뇌 도전용)']
      },
      {
        key: 'inputMethod',
        label: '정답 입력 방식',
        sublabel: '참가자가 개수를 맞추는 방식',
        type: 'chips',
        defaultValue: '하단 숫자 패드 버튼(1~15) 원클릭 제출',
        presets: ['하단 숫자 패드 버튼(1~15) 원클릭 제출', '숫자 직접 타이핑 입력', '+/- 증감 버튼으로 조절 후 확인']
      }
    ],
    generatePrompt: (v) => `너는 지금부터 천재적인 프론트엔드 개발자야. 내가 요구하는 웹앱을 하나의 HTML 파일(CSS, JS 포함)로 완벽하게 만들어줘. 코드는 복사해서 바로 실행할 수 있어야 해.
- 만들 웹앱 종류: 쌓기나무 공간지각 추측 퀴즈 웹앱
- 관찰 시점: ${v.viewAngles} (CSS Grid나 캔버스로 위, 앞, 옆 단면을 깔끔한 모눈종이 위에 표시)
- 블록 스타일: ${v.blockTexture}
- 블록 규모: ${v.maxBlocks}
- 입력 방식: ${v.inputMethod}
- 채점 후 피드백: 정답 확인 시 실제 완성된 3D 쌓기나무 입체 형상을 회전 애니메이션으로 보여주며 몇 개인지 직접 세어볼 수 있게 시각화해줘.`
  },
  {
    id: 'dilemma-scale',
    category: 'quiz',
    categoryLabel: '퀴즈 & 두뇌 훈련',
    title: '도덕적 딜레마 저울 앱',
    subtitle: '두 가지 상충되는 가치 사이에서 선택하고 이유를 성찰',
    badge: '생각 키우기',
    emoji: '⚖️',
    badgeColor: 'bg-violet-100 text-violet-800 border-violet-200',
    desc: '정직 vs 우정, 개인의 자유 vs 공공의 안전! 양쪽 저울에 마음의 무게추를 올려보고 철학적 피드백을 받으세요.',
    tags: ['철학', '딜레마', '성찰', '토론 수업'],
    fields: [
      {
        key: 'dilemmaValues',
        label: '선택해야 할 두 가지 가치 딜레마',
        sublabel: '고민에 빠지게 할 가치 대립',
        type: 'chips',
        defaultValue: '정직(친구의 잘못을 말한다) vs 우정(친구를 감싸준다)',
        presets: ['정직(친구의 잘못을 말한다) vs 우정(친구를 감싸준다)', '개인의 자유(내 마음대로) vs 규칙 준수(모두의 안전)', '현재의 즐거움(지금 놀기) vs 미래의 보상(열심히 공부하기)']
      },
      {
        key: 'scaleDesign',
        label: '선택 버튼의 디자인 인터페이스',
        sublabel: '마음의 선택을 표현하는 UI',
        type: 'chips',
        defaultValue: '실시간으로 기울어지는 인터랙티브 천칭 저울 그래픽 ⚖️',
        presets: ['실시간으로 기울어지는 인터랙티브 천칭 저울 그래픽 ⚖️', '인생의 갈림길 표지판 모양 버튼 🪧', '온도계처럼 게이지를 조절하는 슬라이더']
      },
      {
        key: 'aiTone',
        label: '선택 후 내려주는 피드백의 말투',
        sublabel: '결과 화면에서 참가자를 맞아줄 멘토의 목소리',
        type: 'chips',
        defaultValue: '다정하고 깊이 공감해주는 현명한 선생님 말투 🧑‍🏫',
        presets: ['다정하고 깊이 공감해주는 현명한 선생님 말투 🧑‍🏫', '엄격하고 공정한 솔로몬 판사님 말투 ⚖️', '재치 있고 유쾌한 소크라테스 철학자 말투 🦉']
      },
      {
        key: 'themeColor',
        label: '전체적인 테마 색상',
        sublabel: '화면의 전반적인 분위기 톤',
        type: 'chips',
        defaultValue: '마음이 차분해지는 따뜻한 라벤더 보라 & 소프트 아이보리',
        presets: ['마음이 차분해지는 따뜻한 라벤더 보라 & 소프트 아이보리', '지혜가 느껴지는 딥 네이비 & 골드', '자연친화적인 포레스트 그린 & 베이지']
      }
    ],
    generatePrompt: (v) => `너는 지금부터 천재적인 프론트엔드 개발자야. 내가 요구하는 웹앱을 하나의 HTML 파일(CSS, JS 포함)로 완벽하게 만들어줘. 코드는 복사해서 바로 실행할 수 있어야 해.
- 만들 웹앱 종류: 인터랙티브 도덕적 딜레마 저울 & 가치관 탐구 웹앱
- 고민 주제: ${v.dilemmaValues} (각 선택지마다 현실적인 딜레마 예시 스토리 제공)
- 인터페이스: ${v.scaleDesign} (선택지를 클릭하면 무게추가 올라가며 저울이 부드럽게 기우는 CSS 물리 애니메이션)
- 피드백 어조: ${v.aiTone}
- 테마 색상: ${v.themeColor}
- 추가 조건: 다른 사람들의 선택 비율(가상 통계 퍼센트 바)을 함께 보여주고, "내가 왜 이 선택을 했는지" 한 줄 이유를 적고 저장할 수 있는 성찰 카드 생성.`
  },
  {
    id: 'reflex-test',
    category: 'quiz',
    categoryLabel: '퀴즈 & 두뇌 훈련',
    title: '순발력 테스트 (떨어지는 물건 잡기)',
    subtitle: '신호가 오자마자 클릭! 밀리초(ms) 단위로 측정하는 반응 속도',
    badge: '스피드 측정',
    emoji: '⚡',
    badgeColor: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    desc: '신호음이나 화면 색상이 바뀌는 찰나에 재빨리 화면을 터치하여 나의 순발력 등급을 확인해보세요!',
    tags: ['순발력', '반응속도', '밀리초', '신체 감각'],
    fields: [
      {
        key: 'fallItem',
        label: '갑자기 떨어지거나 나타날 물건 이모지',
        sublabel: '캐치해야 할 목표물',
        type: 'emoji',
        defaultValue: '⚡',
        presets: ['⚡', '🍎', '🪙', '🚀', '🎯', '⚽']
      },
      {
        key: 'warningSignal',
        label: '물건이 떨어지기 전 경고 신호',
        sublabel: '언제 떨어질지 모르는 긴장감 조성',
        type: 'chips',
        defaultValue: '빨간색 배경에서 불시에 초록색으로 번쩍 전환!',
        presets: ['빨간색 배경에서 불시에 초록색으로 번쩍 전환!', '삐- 삐- 경고 비프음과 물방울 파동 애니메이션', '신호등(빨강 -> 노랑 -> 초록) 카운트']
      },
      {
        key: 'unitMeasure',
        label: '반응 속도 측정 단위',
        sublabel: '시간 표시 정밀도',
        type: 'chips',
        defaultValue: '밀리초 (ms - 1/1000초 정밀 타이머)',
        presets: ['밀리초 (ms - 1/1000초 정밀 타이머)', '0.001초 소수점 단위']
      },
      {
        key: 'rankTitles',
        label: '속도에 따른 등급 멘트',
        sublabel: '반응 속도 결과에 붙여줄 명예 칭호',
        type: 'chips',
        defaultValue: '150ms 이하: 번개 치타 🐆 / 250ms: 재빠른 고양이 🐱 / 400ms: 느긋한 거북이 🐢',
        presets: ['150ms 이하: 번개 치타 🐆 / 250ms: 재빠른 고양이 🐱 / 400ms: 느긋한 거북이 🐢', '빛의 속도 ⚡ / 소리의 속도 🔊 / 바람의 속도 🍃', 'F1 레이서 🏎️ / 프로게이머 🎮 / 일반인 🚶']
      }
    ],
    generatePrompt: (v) => `너는 지금부터 천재적인 프론트엔드 개발자야. 내가 요구하는 웹앱을 하나의 HTML 파일(CSS, JS 포함)로 완벽하게 만들어줘. 코드는 복사해서 바로 실행할 수 있어야 해.
- 만들 웹앱 종류: 밀리초(ms) 정밀 순발력 반응속도 테스트 웹앱
- 캐치 타겟: ${v.fallItem}
- 발동 신호: ${v.warningSignal} (1초~5초 사이 무작위 지연 시간 후 발동, 너무 일찍 누르면 '부정 출발!' 경고)
- 측정 단위: ${v.unitMeasure}
- 등급 평가: ${v.rankTitles}
- 추가 조건: 3회 시도 후 평균 반응 속도를 계산해주고, 내 반응 속도가 전 세계 상위 몇 %인지 시각적 정규분포 차트로 보여주는 멋진 결과지 카드 구현.`
  },

  // --- 3. 시뮬레이터 & 상호작용 ---
  {
    id: 'solar',
    category: 'sim',
    categoryLabel: '시뮬레이터 & 상호작용',
    title: '태양계 공전 시뮬레이션',
    subtitle: '행성들이 태양 주위를 도는 과학 탐구 시뮬레이션',
    badge: '과학 축제 강추',
    emoji: '🪐',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
    desc: '태양을 중심으로 지구, 달, 화성 등 다양한 행성들이 아름다운 궤도를 따라 도는 교육용 인터랙티브 웹앱입니다.',
    tags: ['천문학', '시각화', '인터랙티브 탐구'],
    fields: [
      {
        key: 'centerName',
        label: '중심 천체 이름과 이모지',
        sublabel: '우주의 중심에 놓일 항성',
        type: 'chips',
        defaultValue: '이글이글 타오르는 태양 ☀️',
        presets: ['이글이글 타오르는 태양 ☀️', '신비로운 초거대 블랙홀 🕳️', '푸른빛의 초신성 🌟']
      },
      {
        key: 'planetList',
        label: '공전할 행성 목록',
        sublabel: '궤도를 돌 행성들의 구성',
        type: 'chips',
        defaultValue: '수성(🪨) - 금성(🌕) - 지구(🌍) - 화성(🔴) - 목성(🪐)',
        presets: ['수성(🪨) - 금성(🌕) - 지구(🌍) - 화성(🔴) - 목성(🪐)', '태양계 8대 행성 전체 (명왕성 포함)', '지구(🌍)와 달(🌙) 중심의 공전-자전계']
      },
      {
        key: 'bgUniverse',
        label: '우주 배경 분위기',
        sublabel: '배경 캔버스의 비주얼 스타일',
        type: 'chips',
        defaultValue: '신비로운 딥스페이스 은하수와 별빛 파티클 🌌',
        presets: ['신비로운 딥스페이스 은하수와 별빛 파티클 🌌', '보라색 성운이 피어오르는 오로라 우주 🔮', '깔끔한 과학 교과서 화이트 모눈종이 📐']
      },
      {
        key: 'interactiveDeck',
        label: '추가 상호작용 컨트롤러',
        sublabel: '사용자가 조작할 수 있는 기능들',
        type: 'chips',
        defaultValue: '행성 클릭 시 과학 백과 팝업 + 공전 속도 조절 슬라이더(0.5x~3x)',
        presets: ['행성 클릭 시 과학 백과 팝업 + 공전 속도 조절 슬라이더(0.5x~3x)', '궤도선 켜기/끄기 토글 + 일시정지/재생 버튼', '행성 간 거리 비율 확대/축소 줌 슬라이더']
      }
    ],
    generatePrompt: (v) => `너는 지금부터 천재적인 프론트엔드 개발자이자 천문학 교육 소프트웨어 엔지니어이야. 내가 요구하는 웹앱을 하나의 HTML 파일(CSS, JS 포함)로 완벽하게 만들어줘. 코드는 복사해서 바로 실행할 수 있어야 해.
- 만들 웹앱 종류: 인터랙티브 태양계 행성 공전 시뮬레이션
- 중심 천체: ${v.centerName}
- 공전 천체들: ${v.planetList} (각 행성마다 서로 다른 궤도 반지름과 공전 주기를 계산하여 원형 궤도 운동)
- 우주 배경: ${v.bgUniverse}
- 인터랙티브 제어 기능: ${v.interactiveDeck}
- 추가 조건: HTML5 Canvas 또는 CSS 애니메이션으로 부드럽게 돌아가며, 모바일 터치로도 행성을 탭하면 이름과 재미있는 과학 상식 팝업이 뜨도록 구현해줘.`
  },
  {
    id: 'constellation',
    category: 'sim',
    categoryLabel: '시뮬레이터 & 상호작용',
    title: '계절별 별자리 관측 시뮬레이터',
    subtitle: '밤하늘의 별들을 잇고 그리스 신화와 천문 지식을 탐험',
    badge: '선생님 예시',
    emoji: '🌌',
    badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    desc: '계절에 따라 달라지는 밤하늘을 회전시키고 별자리를 클릭해 별자리 선을 잇고 전설을 읽어보세요.',
    tags: ['별자리', '천문학', '신화', '인터랙티브 관측'],
    fields: [
      {
        key: 'defaultSeason',
        label: '기본으로 보여줄 계절',
        sublabel: '처음 화면에 뜰 밤하늘 계절',
        type: 'chips',
        defaultValue: '사계절 선택 버튼 제공 (봄, 여름, 가을, 겨울 토글)',
        presets: ['사계절 선택 버튼 제공 (봄, 여름, 가을, 겨울 토글)', '봄의 밤하늘 (목동자리, 처녀자리, 사자자리)', '여름의 밤하늘 (거문고자리, 독수리자리, 백조자리)', '겨울의 밤하늘 (오리온자리, 큰개자리, 황소자리)']
      },
      {
        key: 'skyVisual',
        label: '밤하늘 배경 스타일',
        sublabel: '천구의 시각적 느낌',
        type: 'chips',
        defaultValue: '반짝이는 수천 개의 별빛이 쏟아지는 사실적인 딥블루 밤하늘 ✨',
        presets: ['반짝이는 수천 개의 별빛이 쏟아지는 사실적인 딥블루 밤하늘 ✨', '감성적인 일러스트 수채화풍 우주 🎨', '천체 망원경 렌즈로 들여다보는 원형 뷰파인더 🔭']
      },
      {
        key: 'lineToggle',
        label: '별자리 선 연결 표시 방식',
        sublabel: '선으로 이을지 점으로만 보여줄지 여부',
        type: 'chips',
        defaultValue: '마우스를 올리거나 터치하면 빛나는 선으로 자동 연결 + 성도 그림 오버레이',
        presets: ['마우스를 올리거나 터치하면 빛나는 선으로 자동 연결 + 성도 그림 오버레이', '기본은 반짝이는 별 점만 보이고 [선 잇기] 토글 버튼 제공', '사용자가 직접 별들을 클릭해서 선을 이어보는 미니 퍼즐 모드']
      },
      {
        key: 'popupContent',
        label: '별자리 클릭 시 팝업 내용',
        sublabel: '별자리를 눌렀을 때 얻을 지식',
        type: 'chips',
        defaultValue: '흥미진진한 그리스 로마 신화 이야기 + 알파별 과학적 정보(거리, 밝기)',
        presets: ['흥미진진한 그리스 로마 신화 이야기 + 알파별 과학적 정보(거리, 밝기)', '어린이를 위한 쉬운 동화식 설명', '천문 관측 가이드 (찾는 방법과 1등성 안내)']
      }
    ],
    generatePrompt: (v) => `너는 지금부터 천재적인 프론트엔드 개발자야. 내가 요구하는 웹앱을 하나의 HTML 파일(CSS, JS 포함)로 완벽하게 만들어줘. 코드는 복사해서 바로 실행할 수 있어야 해.
- 만들 웹앱 종류: 인터랙티브 계절별 별자리 관측 시뮬레이터
- 계절 선택: ${v.defaultSeason} (상단에 봄/여름/가을/겨울 탭 버튼으로 즉시 전환)
- 밤하늘 그래픽: ${v.skyVisual}
- 별자리 연결 인터랙션: ${v.lineToggle}
- 상세 정보 팝업: ${v.popupContent}
- 추가 조건: 밤하늘을 마우스 드래그나 스마트폰 스와이프로 360도 천천히 둘러볼 수 있고, 밤하늘 감상용 잔잔한 BGM 재생 토글 버튼을 추가해줘.`
  },
  {
    id: 'interactive-ebook',
    category: 'sim',
    categoryLabel: '시뮬레이터 & 상호작용',
    title: '상호작용 이북 (e-Book) 만들기',
    subtitle: '단어를 누르면 소리가 나고 그림이 움직이는 인터랙티브 동화책',
    badge: '선생님 예시',
    emoji: '📖',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    desc: '책장을 사각사각 넘기며 특정 단어나 삽화를 터치하면 숨겨진 애니메이션이 나타나는 나만의 디지털 동화책입니다.',
    tags: ['전자책', '스토리텔링', '상호작용 동화', '창작'],
    fields: [
      {
        key: 'storyGenre',
        label: '이야기의 장르와 스토리',
        sublabel: '동화책의 세계관',
        type: 'chips',
        defaultValue: '신비한 마법 숲을 여행하는 아기 숲요정 동화 🌲',
        presets: ['신비한 마법 숲을 여행하는 아기 숲요정 동화 🌲', '먼 우주로 날아간 우주비행견의 모험 SF 🚀', '사라진 황금 열쇠의 비밀을 푸는 명탐정 추리 🕵️']
      },
      {
        key: 'heroDetails',
        label: '주인공 이름과 대표 이모지',
        sublabel: '책의 주인공 마스코트',
        type: 'chips',
        defaultValue: '달콤한 토끼 \'루루\' 🐰 (또는 호기심 많은 아기 고양이 \'미오\' 🐱)',
        presets: ['달콤한 토끼 \'루루\' 🐰 (또는 호기심 많은 아기 고양이 \'미오\' 🐱)', '용감한 꼬마 로봇 \'치치\' 🤖', '하늘을 날고 싶은 아기 펭귄 \'포포\' 🐧']
      },
      {
        key: 'pageTurnEffect',
        label: '페이지 넘김 효과',
        sublabel: '책을 읽는 손맛 연출',
        type: 'chips',
        defaultValue: '진짜 책장처럼 사각 넘겨지는 3D 입체 페이지 넘김 (Book Flip)',
        presets: ['진짜 책장처럼 사각 넘겨지는 3D 입체 페이지 넘김 (Book Flip)', '부드러운 좌우 슬라이드 카드 전환', '투명하게 페이드 인/아웃 전환']
      },
      {
        key: 'wordInteraction',
        label: '특정 단어/그림 클릭 시 인터랙션',
        sublabel: '숨겨진 인터랙티브 요소',
        type: 'chips',
        defaultValue: '강조된 단어를 누르면 효과음과 함께 관련 이모지가 팡 터져 나옴!',
        presets: ['강조된 단어를 누르면 효과음과 함께 관련 이모지가 팡 터져 나옴!', '단어 클릭 시 한국어/영어 음성 낭독 (TTS) 지원', '배경의 사물을 클릭하면 숨어있던 동물들이 쏙 고개를 내밈']
      }
    ],
    generatePrompt: (v) => `너는 지금부터 천재적인 프론트엔드 개발자야. 내가 요구하는 웹앱을 하나의 HTML 파일(CSS, JS 포함)로 완벽하게 만들어줘. 코드는 복사해서 바로 실행할 수 있어야 해.
- 만들 웹앱 종류: 인터랙티브 상호작용 디지털 이북(e-Book)
- 세계관 및 장르: ${v.storyGenre}
- 주인공: ${v.heroDetails} (화면 모퉁이에서 살아 숨쉬듯 깜빡임)
- 페이지 넘김: ${v.pageTurnEffect} (하단 이전/다음 버튼 및 터치 스와이프)
- 인터랙티브 반응: ${v.wordInteraction}
- 추가 조건: 총 3~4페이지 분량의 완성도 높은 짧은 스토리를 내장하고, 따뜻하고 감성적인 동화책 종이 질감 레이아웃으로 스타일링해줘.`
  },
  {
    id: 'mbti-test',
    category: 'sim',
    categoryLabel: '시뮬레이터 & 상호작용',
    title: 'MBTI 심리/유형 검사 앱',
    subtitle: '질문에 답하면 나만의 동물/직업 캐릭터 유형이 짠!',
    badge: '선생님 예시',
    emoji: '🧩',
    badgeColor: 'bg-pink-100 text-pink-800 border-pink-200',
    desc: '축제 부스에서 친구, 가족과 함께 1분 만에 해보는 심리 테스트! 공유하기 좋은 예쁜 결과 카드를 만듭니다.',
    tags: ['심리테스트', 'MBTI', '캐릭터 분석', '공유 카드'],
    fields: [
      {
        key: 'testConcept',
        label: '테스트 컨셉 주제',
        sublabel: '어떤 유형을 찾아줄까요?',
        type: 'chips',
        defaultValue: '"나는 어떤 신비한 동물 캐릭터일까?" (동물 성격 유형)',
        presets: ['"나는 어떤 신비한 동물 캐릭터일까?" (동물 성격 유형)', '"미래에 나와 찰떡인 최고의 과학 직업은?" (진로 탐색)', '"내가 만약 디저트라면 어떤 맛일까?" (디저트 성향)', '"조선시대였다면 나의 직업은?" (역사 인물)']
      },
      {
        key: 'questionCount',
        label: '질문의 개수',
        sublabel: '부스 회전율에 맞춘 문항 수',
        type: 'chips',
        defaultValue: '간단하고 빠른 4문항 (1분 컷)',
        presets: ['간단하고 빠른 4문항 (1분 컷)', '알차고 정확한 8문항 (3분 컷)', '정식 12문항 (5분 컷)']
      },
      {
        key: 'resultTypes',
        label: '결과 화면에 나올 4가지 주요 타입 이름',
        sublabel: '최종 매칭될 캐릭터들',
        type: 'chips',
        defaultValue: '열정 만렙 불사조 🦅 / 사려 깊은 올빼미 🦉 / 사교적인 돌고래 🐬 / 듬직한 판다 🐼',
        presets: ['열정 만렙 불사조 🦅 / 사려 깊은 올빼미 🦉 / 사교적인 돌고래 🐬 / 듬직한 판다 🐼', '우주비행사 🚀 / 로봇공학자 🤖 / 해양생물학자 🐋 / 생명과학자 🧬', '달콤한 딸기케이크 🍰 / 톡 쏘는 레몬에이드 🍋 / 쌉싸름한 다크초코 🍫']
      },
      {
        key: 'buttonShape',
        label: 'UI 버튼 및 선택지 모양',
        sublabel: '질문 선택지의 그래픽 스타일',
        type: 'chips',
        defaultValue: '말풍선 모양의 둥글둥글하고 귀여운 카드 버튼 💬',
        presets: ['말풍선 모양의 둥글둥글하고 귀여운 카드 버튼 💬', '레트로 픽셀 게임 스타일 각진 버튼 🕹️', '우아한 그라데이션 소프트 글래스모피즘']
      }
    ],
    generatePrompt: (v) => `너는 지금부터 천재적인 프론트엔드 개발자야. 내가 요구하는 웹앱을 하나의 HTML 파일(CSS, JS 포함)로 완벽하게 만들어줘. 코드는 복사해서 바로 실행할 수 있어야 해.
- 만들 웹앱 종류: 인터랙티브 성격/유형 검사 (MBTI 스타일) 웹앱
- 테스트 컨셉: ${v.testConcept}
- 문항 볼륨: ${v.questionCount} (각 문항마다 선택지 2개씩 제공, 상단 진행 게이지 바)
- 결과 타입: ${v.resultTypes}
- 선택지 버튼 UI: ${v.buttonShape}
- 추가 조건: 질문을 모두 풀면 "결과 분석 중..." 로딩 애니메이션 후 대표 이모지, 성격 해설, 찰떡궁합 친구 유형, 그리고 [결과 이미지 캡처/복사] 버튼이 포함된 인스타 감성 결과 카드 출력.`
  },
  {
    id: 'interactive-profile',
    category: 'sim',
    categoryLabel: '시뮬레이터 & 상호작용',
    title: '나를 소개하는 인터랙티브 웹페이지',
    subtitle: '내가 좋아하는 것과 꿈을 멋진 애니메이션으로 뽐내기',
    badge: '선생님 예시',
    emoji: '👤',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
    desc: '세상에 단 하나뿐인 나만의 자기소개 웹페이지! 이모지 아바타와 마우스 파티클로 개성을 표현하세요.',
    tags: ['자기소개', '포트폴리오', '나만의 웹', '창작'],
    fields: [
      {
        key: 'overallTheme',
        label: '전체적인 테마 분위기',
        sublabel: '나를 표현할 디자인 컨셉',
        type: 'chips',
        defaultValue: '미래지향적인 해커의 비밀 터미널 모니터 💻',
        presets: ['미래지향적인 해커의 비밀 터미널 모니터 💻', '아기자기하고 따뜻한 손그림 다이어리 📓', '세련되고 깔끔한 힙스터 포트폴리오 🎨', '반짝이는 사이버 우주선 조종석 🛸']
      },
      {
        key: 'cursorEffect',
        label: '마우스 커서를 따라다니는 파티클 효과',
        sublabel: '마우스나 손가락을 움직일 때 흩날릴 이펙트',
        type: 'chips',
        defaultValue: '영롱하게 반짝이는 은하수 별빛 가루 ✨',
        presets: ['영롱하게 반짝이는 은하수 별빛 가루 ✨', '살랑살랑 내리는 하얀 눈송이 ❄️', '둥둥 떠다니는 장난꾸러기 유령 👻', '팡팡 튀는 무지개 거품 방울 🫧']
      },
      {
        key: 'sectionsIncluded',
        label: '필수 포함 프로필 섹션',
        sublabel: '나에 대해 알릴 내용들',
        type: 'chips',
        defaultValue: '내 소개 한 줄 / 좋아하는 음식 & 취미 / 나의 장래희망 / 비밀 메시지 상자',
        presets: ['내 소개 한 줄 / 좋아하는 음식 & 취미 / 나의 장래희망 / 비밀 메시지 상자', '나의 인생 영화 & 노래 / 관심 있는 과학 기술 / 친구들에게 한마디', '나를 표현하는 3가지 키워드 / 좌우명 / 타임캡슐']
      },
      {
        key: 'customAvatar',
        label: '커스텀 아바타 (이모지 조합)',
        sublabel: '프로필 사진 자리에 들어갈 마스코트',
        type: 'chips',
        defaultValue: '우주복 입은 고양이 🚀🐱 (또는 힙한 안경 쓴 곰 🕶️🐻)',
        presets: ['우주복 입은 고양이 🚀🐱 (또는 힙한 안경 쓴 곰 🕶️🐻)', '마법사 모자를 쓴 공룡 🧙‍♂️🦖', '연구실의 천재 과학자 🥼🧪', '헤드폰 낀 토끼 🎧🐰']
      }
    ],
    generatePrompt: (v) => `너는 지금부터 천재적인 프론트엔드 개발자야. 내가 요구하는 웹앱을 하나의 HTML 파일(CSS, JS 포함)로 완벽하게 만들어줘. 코드는 복사해서 바로 실행할 수 있어야 해.
- 만들 웹앱 종류: 나를 소개하는 인터랙티브 퍼스널 자기소개 웹페이지
- 전체적인 디자인 테마: ${v.overallTheme}
- 마우스 커서 파티클: ${v.cursorEffect} (Canvas 기반으로 마우스/터치 궤적을 따라 부드럽게 생성되고 사라짐)
- 콘텐츠 섹션: ${v.sectionsIncluded} (각 섹션마다 클릭 시 아코디언처럼 펼쳐지거나 탭 카드로 전환)
- 대표 아바타: ${v.customAvatar} (클릭하면 통통 튀며 표정이나 옷이 바뀌는 귀여운 인터랙션)
- 추가 조건: 방문자가 방명록 한 줄을 남길 수 있는 입력창과 '좋아요 ❤️' 카운터 버튼을 만들어줘.`
  },
  {
    id: 'mood-weather',
    category: 'sim',
    categoryLabel: '시뮬레이터 & 상호작용',
    title: '감정 날씨 일기장',
    subtitle: '오늘의 기분을 날씨로 기록하고 마음을 보듬는 힐링 다이어리',
    badge: '힐링 다이어리',
    emoji: '🌦️',
    badgeColor: 'bg-teal-100 text-teal-800 border-teal-200',
    desc: '내 기분은 맑음? 천둥번개? 날씨 이모지를 누르면 배경에 비가 내리거나 햇살이 비치며 일기가 저장됩니다.',
    tags: ['감정 기록', '날씨 애니메이션', '일기장', '마음 챙김'],
    fields: [
      {
        key: 'weatherSet',
        label: '기분을 표현할 날씨 이모지 세트',
        sublabel: '선택할 수 있는 감정 기상도',
        type: 'chips',
        defaultValue: '햇살 눈부심 ☀️ / 포근한 구름 ⛅ / 촉촉한 소나기 🌧️ / 번개 치는 폭풍 ⛈️ / 무지개 🌈',
        presets: ['햇살 눈부심 ☀️ / 포근한 구름 ⛅ / 촉촉한 소나기 🌧️ / 번개 치는 폭풍 ⛈️ / 무지개 🌈', '맑음 ☀️ / 흐림 ☁️ / 비 🌧️ / 눈 ❄️ / 강풍 🌪️', '활기찬 태양 🌞 / 사색의 달밤 🌙 / 설레는 별똥별 🌠']
      },
      {
        key: 'weatherAnimation',
        label: '날씨 선택 시 배경 애니메이션',
        sublabel: '화면 전체에 펼쳐질 인터랙티브 효과',
        type: 'chips',
        defaultValue: '비 선택 시 빗방울이 화면을 타고 흐르고, 맑음 선택 시 따스한 햇살 빔 회전',
        presets: ['비 선택 시 빗방울이 화면을 타고 흐르고, 맑음 선택 시 따스한 햇살 빔 회전', '눈 선택 시 화면 가득 흩날리는 눈송이와 입김 효과', '폭풍 선택 시 번개가 번쩍이며 비바람 몰아침']
      },
      {
        key: 'diaryTexture',
        label: '일기장 배경 재질감',
        sublabel: '글을 적는 노트의 감성 재질',
        type: 'chips',
        defaultValue: '오래된 따뜻한 빈티지 양장 노트 종이 질감 📜',
        presets: ['오래된 따뜻한 빈티지 양장 노트 종이 질감 📜', '투명한 빗방울 맺힌 유리창 🪟', '분필로 사각사각 적는 녹색 칠판 🏫', '깔끔하고 모던한 미니멀 백색 카드']
      },
      {
        key: 'saveFlyEffect',
        label: '저장/제출 시 날아가는 애니메이션',
        sublabel: '기록을 남겼을 때의 뿌듯한 피날레',
        type: 'chips',
        defaultValue: '일기장이 종이비행기 ✈️로 접혀 하늘 위로 슝 날아가는 애니메이션',
        presets: ['일기장이 종이비행기 ✈️로 접혀 하늘 위로 슝 날아가는 애니메이션', '병 속에 담겨 바다 멀리 떠내려가는 유리병 편지 🍾', '별똥별이 되어 밤하늘로 승천하는 반짝임 🌠']
      }
    ],
    generatePrompt: (v) => `너는 지금부터 천재적인 프론트엔드 개발자야. 내가 요구하는 웹앱을 하나의 HTML 파일(CSS, JS 포함)로 완벽하게 만들어줘. 코드는 복사해서 바로 실행할 수 있어야 해.
- 만들 웹앱 종류: 인터랙티브 감정 날씨 일기장 (Mood Weather Diary)
- 감정 날씨 선택지: ${v.weatherSet}
- 날씨 배경 연출: ${v.weatherAnimation} (선택된 날씨에 따라 실시간 캔버스 날씨 효과 전환)
- 일기장 인터페이스: ${v.diaryTexture} (날짜, 기분 한 줄, 감사한 일 3가지를 적는 포근한 폼)
- 저장 애니메이션: ${v.saveFlyEffect}
- 추가 조건: 작성한 일기가 로컬스토리지에 저장되어 하단에 '나의 감정 달력 캘린더'로 지난 날씨를 한눈에 모아볼 수 있게 구성해줘.`
  },
  {
    id: 'sociogram',
    category: 'sim',
    categoryLabel: '시뮬레이터 & 상호작용',
    title: '소시오그램 (인간관계) 시각화 보드',
    subtitle: '나를 중심으로 가족, 친구 관계를 젤리처럼 연결하는 네트워크 맵',
    badge: '네트워크 과학',
    emoji: '🕸️',
    badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-200',
    desc: '마우스로 노드를 당기면 탱탱하게 튕기는 젤리 물리 엔진! 나와 친구들의 소중한 유대를 시각화하세요.',
    tags: ['소시오그램', '인간관계', '네트워크 맵', '물리 엔진'],
    fields: [
      {
        key: 'centerNodeColor',
        label: '나를 나타내는 중심 노드(원) 색상',
        sublabel: '네트워크의 중심이 될 나의 노드',
        type: 'chips',
        defaultValue: '황금빛으로 빛나는 네온 골드 옐로우 🌟',
        presets: ['황금빛으로 빛나는 네온 골드 옐로우 🌟', '포근한 파스텔 핑크 🌸', '청량한 에메랄드 민트 💎', '신비한 일렉트릭 바이올렛 🔮']
      },
      {
        key: 'peerEmojis',
        label: '주변 친구/가족을 나타내는 노드 이모지',
        sublabel: '연결할 소중한 사람들의 마스코트',
        type: 'chips',
        defaultValue: '단짝친구(🐶), 가족(🏡), 선생님(🦉), 동아리 친구(🚀), 짝꿍(🐱)',
        presets: ['단짝친구(🐶), 가족(🏡), 선생님(🦉), 동아리 친구(🚀), 짝꿍(🐱)', '우리 반 친구들 이모지 (🦁🐼🐰🐻🦊🐯)', '가상 프로젝트 팀원 (💻🎨📊📝)']
      },
      {
        key: 'linkLineStyle',
        label: '연결선의 형태와 두께',
        sublabel: '친밀도를 나타낼 관계 선',
        type: 'chips',
        defaultValue: '친밀도에 따라 굵기가 다른 탄력 있는 젤리 선 (두꺼운 실선, 점선)',
        presets: ['친밀도에 따라 굵기가 다른 탄력 있는 젤리 선 (두꺼운 실선, 점선)', '은은한 네온 레이저 광선 ⚡', '반짝이는 진주 목걸이 점선 ✨']
      },
      {
        key: 'physicsVibe',
        label: '물리 엔진 효과 (마우스 인터랙션)',
        sublabel: '노드를 마우스로 잡고 끌었을 때의 반응',
        type: 'chips',
        defaultValue: '노드를 드래그하면 엿가락이나 탱탱볼처럼 튕기며 자연스럽게 감속하는 스프링 물리',
        presets: ['노드를 드래그하면 엿가락이나 탱탱볼처럼 튕기며 자연스럽게 감속하는 스프링 물리', '무중력 우주 공간에서 둥둥 부유하는 중력장 효과', '물방울처럼 합쳐졌다 떨어지는 액체 시뮬레이션']
      }
    ],
    generatePrompt: (v) => `너는 지금부터 천재적인 프론트엔드 개발자야. 내가 요구하는 웹앱을 하나의 HTML 파일(CSS, JS 포함)로 완벽하게 만들어줘. 코드는 복사해서 바로 실행할 수 있어야 해.
- 만들 웹앱 종류: 인터랙티브 소시오그램(Sociogram) 인간관계 네트워크 그래프
- 중심 노드 (나): ${v.centerNodeColor} (화면 중앙에서 펄스 맥박 애니메이션)
- 주변 인물 노드들: ${v.peerEmojis}
- 연결선 표현: ${v.linkLineStyle}
- 물리 인터랙션: ${v.physicsVibe} (Canvas 기반의 스프링 힘-방향 그래프 시뮬레이션 적용, 마우스 드래그로 위치 이동 가능)
- 추가 조건: [새로운 친구 추가] 버튼으로 이름과 친밀도를 입력해 즉시 노드를 추가할 수 있고, 노드를 클릭하면 그 친구와의 추억 메모 카드가 뜨게 해줘.`
  },
  {
    id: 'launchpad',
    category: 'sim',
    categoryLabel: '시뮬레이터 & 상호작용',
    title: '웹 기반 디지털 런치패드 (악기 연주)',
    subtitle: '알록달록 버튼을 누르면 비트와 멜로디가 터지는 나만의 신디사이저',
    badge: '음악 & 비트',
    emoji: '🎹',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
    desc: '터치하면 신나는 비트가 터지는 디지털 가상 악기! 스마트폰 화면에 딱 맞춘 반응형 패드 격자와 모바일 멀티 터치를 지원합니다.',
    tags: ['디지털 악기', '모바일 멀티 터치', '비트메이커', '사운드'],
    fields: [
      {
        key: 'padGrid',
        label: '패드 버튼의 배열 크기',
        sublabel: '연주할 버튼 격자 수 (모바일 화면 자동 비율 맞춤)',
        type: 'chips',
        defaultValue: '4x4 배열 (총 16개 패드 버튼)',
        presets: ['3x3 배열 (총 9개 패드 - 모바일 추천)', '4x4 배열 (총 16개 패드 - 표준 런치패드)', '2x4 배열 (8음계 도레미파솔라시도)']
      },
      {
        key: 'soundTheme',
        label: '소리(음향) 테마',
        sublabel: '버튼을 눌렀을 때 울릴 가상 악기 음색',
        type: 'chips',
        defaultValue: '신나는 EDM 드럼 & 힙합 베이스 비트 🥁',
        presets: ['신나는 EDM 드럼 & 힙합 베이스 비트 🥁', '영롱하고 맑은 클래식 그랜드 피아노 🎹', '추억의 8비트 레트로 패미컴 아케이드 효과음 👾', '우주 SF 공상과학 신디사이저 패드 🚀']
      },
      {
        key: 'buttonVisual',
        label: '버튼 클릭 시 색상 및 조명 변화',
        sublabel: '패드를 탭할 때의 시각 피드백',
        type: 'chips',
        defaultValue: '누르는 순간 형형색색 무지개 네온 LED가 폭발하듯 번쩍임!',
        presets: ['누르는 순간 형형색색 무지개 네온 LED가 폭발하듯 번쩍임!', '눌린 패드 중심으로 물결 파동(Ripple) 확산', '사이버펑크 일렉트릭 블루와 핫핑크 광채']
      },
      {
        key: 'rhythmVisualizer',
        label: '배경에 깔리는 리듬 시각화 효과',
        sublabel: '음악에 맞춰 춤추는 배경 그래픽',
        type: 'chips',
        defaultValue: '하단에 쿵쿵 뛰는 이퀄라이저 주파수 막대그래프 (Audio Spectrum)',
        presets: ['하단에 쿵쿵 뛰는 이퀄라이저 주파수 막대그래프 (Audio Spectrum)', '중앙에서 쿵쿵 박동하는 네온 서클 펄스', '화면 전체를 감싸는 오로라 파동']
      }
    ],
    generatePrompt: (v) => `너는 지금부터 천재적인 프론트엔드 개발자이자 사운드 엔지니어이야. 내가 요구하는 웹앱을 하나의 HTML 파일(CSS, JS 포함)로 완벽하게 만들어줘. 코드는 복사해서 바로 실행할 수 있어야 해.
- 만들 웹앱 종류: 인터랙티브 웹 기반 디지털 런치패드 (Virtual Launchpad)
- 패드 배열: ${v.padGrid} (키보드 1~4, Q~R, A~F, Z~V 키 매핑 및 스마트폰 모바일 화면 멀티 터치 touchstart 완벽 지원)
- 사운드 구현: ${v.soundTheme} (Web Audio API의 오실레이터 Synthesizer를 사용하여 외부 파일 없이 순수 JS 코드로 깨끗한 음계 및 드럼 타격음 합성, 모바일 첫 터치 시 AudioContext 자동 활성화)
- 패드 조명: ${v.buttonVisual}
- 오디오 비주얼라이저: ${v.rhythmVisualizer}
- 추가 조건: 스마트폰 가로/세로 화면에 맞춘 반응형 패드 크기와 [자동 드럼 비트 루프 재생/정지] 버튼을 두어 배경 리듬 위에 즉흥 멜로디를 얹어 연주할 수 있게 해줘.`
  },
  {
    id: 'pomodoro-timer',
    category: 'sim',
    categoryLabel: '시뮬레이터 & 상호작용',
    title: '타이머 & 집중력 뽀모도로 시계',
    subtitle: '시간이 흐르면 씨앗이 자라 꽃이 피어나는 마법의 집중 타이머',
    badge: '집중력 UP',
    emoji: '⏳',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    desc: '시간이 흐르면 식물이 자라는 집중 타이머! 책상 위 스마트폰을 거치해두고 보기에 최적화된 풀스크린 반응형 타이머입니다.',
    tags: ['뽀모도로', '모바일 풀스크린', '타이머', '생산성'],
    fields: [
      {
        key: 'focusMinutes',
        label: '기본 집중 시간 설정',
        sublabel: '타이머 시작 시간 (분 단위)',
        type: 'chips',
        defaultValue: '25분 집중 + 5분 휴식 (정통 뽀모도로)',
        presets: ['10분 집중 (가벼운 짧은 미션)', '25분 집중 + 5분 휴식 (정통 뽀모도로)', '50분 집중 + 10분 휴식 (본격 시험 공부)', '자유 시간 직접 분 단위 입력']
      },
      {
        key: 'clockShape',
        label: '시계의 시각적 형태 디자인',
        sublabel: '시간이 줄어드는 것을 보여줄 그래픽',
        type: 'chips',
        defaultValue: '동글동글 원형 도넛 프로그레스 링 (Circular Progress)',
        presets: ['동글동글 원형 도넛 프로그레스 링 (Circular Progress)', '모래가 스르륵 떨어지는 감성 모래시계 ⏳', '큼직하고 또렷한 네온 디지털 숫자 전광판 ⏱️']
      },
      {
        key: 'timeEvolution',
        label: '시간이 흐를수록 화면에 나타나는 변화',
        sublabel: '집중하는 동안 일어날 보상 애니메이션',
        type: 'chips',
        defaultValue: '작은 씨앗🌱에서 줄기가 자라나 예쁜 해바라기🌻로 활짝 피어남',
        presets: ['작은 씨앗🌱에서 줄기가 자라나 예쁜 해바라기🌻로 활짝 피어남', '낮의 푸른 하늘☀️에서 노을을 거쳐 은하수 밤하늘🌙로 서서히 변함', '아기 공룡 알이 점점 금이 가다 귀여운 아기 공룡🦖으로 부화함']
      },
      {
        key: 'finishAlarm',
        label: '집중 완료 시 알림음 분위기',
        sublabel: '목표 시간에 도달했을 때의 축하',
        type: 'chips',
        defaultValue: '마음을 편안하게 울리는 맑고 청아한 싱잉볼 종소리 🔔',
        presets: ['마음을 편안하게 울리는 맑고 청아한 싱잉볼 종소리 🔔', '신나는 성취감 축하 팡파레 🎺', '새들의 지저귐과 숲속 바람 소리 🕊️']
      }
    ],
    generatePrompt: (v) => `너는 지금부터 천재적인 프론트엔드 개발자야. 내가 요구하는 웹앱을 하나의 HTML 파일(CSS, JS 포함)로 완벽하게 만들어줘. 코드는 복사해서 바로 실행할 수 있어야 해.
- 만들 웹앱 종류: 인터랙티브 뽀모도로 집중력 타이머 (Focus Pomodoro)
- 시간 규칙: ${v.focusMinutes}
- 시계 디자인: ${v.clockShape}
- 성장 시각화: ${v.timeEvolution} (남은 시간에 비례하여 단계별로 상태가 변화하는 감성 그래픽)
- 완료 알림: ${v.finishAlarm} (Web Audio API로 아름다운 알림음 합성)
- 추가 조건: 스마트폰을 거치대에 올려두고 감상하기 좋은 풀스크린 반응형 레이아웃과 [시작], [일시정지], [리셋] 대형 터치 버튼 및 오늘 성공한 집중 횟수(토마토 스탬프 🍅) 대시보드 포함.`
  },

  // --- 4. 자유 창작 ---
  {
    id: 'custom',
    category: 'custom',
    categoryLabel: '자유 창작',
    title: '자유 창작 웹앱 (간이 PRD)',
    subtitle: '내가 상상하는 기발한 웹앱을 나만의 아이디어로 제작',
    badge: '무한 상상력',
    emoji: '✨',
    badgeColor: 'bg-pink-100 text-pink-800 border-pink-200',
    desc: '내가 상상하는 기발한 웹앱! 스마트폰 세로 화면과 PC 모니터 모두에서 시원하고 편리하게 작동하도록 제작됩니다.',
    tags: ['창의력 UP', '모바일 & PC 완벽 호환', '간이 PRD', '자유 기획'],
    fields: [
      {
        key: 'appName',
        label: '만들고 싶은 웹앱 이름',
        sublabel: '나만의 기발한 앱 이름',
        type: 'text',
        defaultValue: '행운의 과학 포춘쿠키 뽑기',
        placeholder: '예: 오늘의 하루 운세, 축제 타이머 머신, 원소 퀴즈'
      },
      {
        key: 'coreFeature',
        label: '핵심 기능 설명 (무엇을 하는 앱인가요?)',
        sublabel: '버튼을 눌렀을 때 어떤 일이 일어나는지 구체적으로 적어주세요',
        type: 'textarea',
        defaultValue: '버튼을 누르면 바삭하게 쿠키가 깨지는 애니메이션과 함께 매일 새로운 과학 상식과 응원 메시지가 나타나고 화려한 꽃가루(팡파레)가 터진다.'
      },
      {
        key: 'uiLayout',
        label: 'UI 구성 및 레이아웃 요소',
        sublabel: '스마트폰 세로 화면과 PC 모니터를 고려한 버튼과 카드의 구조',
        type: 'text',
        defaultValue: '화면 상단에 알록달록한 제목, 중앙에 커다란 반응형 포춘쿠키 터치 버튼, 하단에 결과 카드와 복사/공유 버튼'
      },
      {
        key: 'keyEmoji',
        label: '핵심 마스코트 이모지',
        sublabel: '앱을 대표할 대표 아이콘',
        type: 'emoji',
        defaultValue: '🥠',
        presets: ['🥠', '🔮', '🧪', '🚀', '🎁', '⚡', '🪄']
      },
      {
        key: 'colorTheme',
        label: '분위기 및 색상 테마',
        sublabel: '화면의 전반적인 색감 톤',
        type: 'chips',
        defaultValue: '민트와 밝은 노란색, 보라색 포인트가 어우러진 축제 테마',
        presets: ['민트와 밝은 노란색, 보라색 포인트가 어우러진 축제 테마', '다크 모드 네온 사이버펑크 ⚡', '따뜻한 파스텔 동화 톤 🌸', '시원한 오션 블루 🌊']
      }
    ],
    generatePrompt: (v) => `너는 지금부터 천재적인 프론트엔드 개발자야. 내가 요구하는 웹앱을 하나의 HTML 파일(CSS, JS 포함)로 완벽하게 만들어줘. 코드는 복사해서 바로 실행할 수 있어야 해.
- 만들 웹앱 이름: ${v.appName || '나만의 재미있는 웹앱'}
- 핵심 기능 설명: ${v.coreFeature || '사용자가 버튼을 클릭하면 인터랙티브한 반응과 결과를 보여준다.'}
- UI 구성 및 레이아웃 요소: ${v.uiLayout || '상단 타이틀, 중앙 주요 인터랙션 카드, 하단 컨트롤러'}
- 핵심 이모지 아이콘: ${v.keyEmoji || '✨'} 이모지를 메인 마스코트로 활용해줘.
- 전체적인 배경 및 색상 테마: ${v.colorTheme || '밝고 경쾌한 페스티벌 컬러(노랑, 보라, 민트 포인트)'}
- 필수 조건:
  1. 외부 복잡한 라이브러리 없이 순수 HTML, CSS, JavaScript로 작동해야 해.
  2. 스마트폰(세로 모드)과 PC 브라우저 모두에서 아름답고 직관적으로 작동하는 반응형 디자인이어야 해.
  3. 모든 버튼은 엄지손가락으로 터치하기 편하게 큼직해야 하며, 누르면 즉각적인 반응(호버, 클릭 액션, 사운드 또는 진동 시각효과)이 확실해야 해.
전체 코드를 복사해서 바로 index.html로 저장해 실행할 수 있는 완성형 코드로 작성해줘.`
  }
];

// Common cross-device mobile/tablet/laptop responsiveness guideline appended to all generated prompts
export const CROSS_DEVICE_MOBILE_GUIDELINES = `
📱 [노트북 · 태블릿 · 스마트폰 전 기기 완벽 호환 필수 조건 (필수 반영)]
1. 화면 비율 & 반응형 뷰포트 맞춤 (스마트폰 세로 모드 대응):
   - 노트북/PC뿐 아니라 스마트폰(가로 360~430px 기준 세로 화면)과 태블릿에서도 화면 밖으로 넘치거나 잘림 없이 한 화면(100vh / 100dvh)에 쏙 들어오는 반응형 레이아웃(max-w-md 등 유연한 모바일 친화적 컨테이너)으로 설계해줘.
   - 모바일 브라우저 주소창이나 하단 네비게이션 바에 중요한 버튼이나 게임 요소가 가려지지 않도록 안전 영역(safe-area)과 padding을 충분히 확보하고, 불필요한 전체 페이지 스크롤이 생기지 않도록 overflow를 깔끔하게 제어해줘.
2. 터치 & 키보드 듀얼 컨트롤 지원 (스마트폰 터치 플레이 필수):
   - 노트북/PC용 키보드 조작(방향키, 스페이스바, 숫자키 등)뿐만 아니라, 스마트폰/태블릿 화면 터치만으로도 100% 원활하게 플레이할 수 있어야 해.
   - 이동이나 점프, 액션이 필요한 경우 화면 하단에 엄지손가락으로 쉽게 누를 수 있는 큼직한 모바일 전용 가상 조작 버튼(On-Screen D-Pad / 방향키 / 액션 버튼, 최소 48px 이상 크기)을 기본으로 화면에 띄워줘.
   - 모든 터치/클릭 버튼은 손가락으로 누르기 편한 크기와 넉넉한 터치 간격을 보장해줘.
3. 모바일 터치 사용성 & 오디오 정책 배려:
   - 스마트폰에서 빠르게 화면을 연타할 때 화면이 원치 않게 확대(Zoom)되지 않도록 \`touch-action: manipulation;\` 및 텍스트 드래그 방지(\`user-select: none;\`) 스타일을 적용해줘.
   - 효과음(Web Audio API) 사용 시 모바일 브라우저의 오디오 정책(사용자의 첫 터치 인터랙션 시 AudioContext 자동 활성화)을 준수하여 무음 오류 없이 소리가 잘 나게 해줘.`;

// Educational Question Card Badge for Memory Card Game (Card with question mark, strictly no gambling/hanafuda imagery)
function QuestionCardBadge({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeStyles =
    size === 'lg'
      ? 'w-11 h-14 rounded-xl text-2xl shadow-md border-2'
      : size === 'sm'
      ? 'w-6 h-8 rounded-md text-xs shadow-xs border'
      : 'w-8 h-10 rounded-lg text-base shadow-xs border-2';

  return (
    <div
      className={`relative inline-flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 text-white font-black border-white select-none ring-1 ring-purple-300/60 ${sizeStyles}`}
      title="물음표 카드 (메모리 매칭)"
    >
      <span className="absolute top-0.5 left-1 text-[8px] font-black opacity-80 leading-none">?</span>
      <span className="text-yellow-200 font-extrabold drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">?</span>
      <span className="absolute bottom-0.5 right-1 text-[8px] font-black opacity-80 leading-none rotate-180">?</span>
    </div>
  );
}

function renderTemplateIcon(tmpl: TemplateDef, size: 'sm' | 'md' | 'lg' = 'md') {
  if (tmpl.id === 'memory-card') {
    return <QuestionCardBadge size={size} />;
  }
  return <span>{tmpl.emoji}</span>;
}

export default function App() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('snake');

  // Form field values state for all templates
  const [formValues, setFormValues] = useState<Record<string, Record<string, any>>>(() => {
    const init: Record<string, Record<string, any>> = {};
    ALL_TEMPLATES.forEach(t => {
      init[t.id] = {};
      t.fields.forEach(f => {
        init[t.id][f.key] = f.defaultValue;
      });
    });
    return init;
  });

  // Festival Showcase Padlet URL
  const DEFAULT_EXHIBITION_URL = 'https://padlet.com/inho5720/1107-s0249w45i0bvi633ce5l';
  const [padletUrl, setPadletUrl] = useState<string>(DEFAULT_EXHIBITION_URL);
  const [showPadletConfig, setShowPadletConfig] = useState<boolean>(false);

  // Copy state & modals
  const [copied, setCopied] = useState<boolean>(false);
  const [showCelebrationModal, setShowCelebrationModal] = useState<boolean>(false);
  const [showGuideModal, setShowGuideModal] = useState<boolean>(false);

  // Load Padlet URL from localStorage if available (override old generic url)
  useEffect(() => {
    const saved = localStorage.getItem('vibe_coding_padlet_url');
    if (saved && saved !== 'https://padlet.com') {
      setPadletUrl(saved);
    } else {
      setPadletUrl(DEFAULT_EXHIBITION_URL);
      localStorage.setItem('vibe_coding_padlet_url', DEFAULT_EXHIBITION_URL);
    }
  }, []);

  const handleSavePadletUrl = (url: string) => {
    setPadletUrl(url);
    localStorage.setItem('vibe_coding_padlet_url', url);
    setShowPadletConfig(false);
  };

  // Currently selected template object
  const currentTemplate = useMemo(() => {
    return ALL_TEMPLATES.find(t => t.id === selectedTemplateId) || ALL_TEMPLATES[0];
  }, [selectedTemplateId]);

  // Filter templates
  const filteredTemplates = useMemo(() => {
    return ALL_TEMPLATES.filter(t => {
      const matchCategory = selectedCategory === 'all' || t.category === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchSearch =
        !q ||
        t.title.toLowerCase().includes(q) ||
        t.subtitle.toLowerCase().includes(q) ||
        t.desc.toLowerCase().includes(q) ||
        t.tags.some(tag => tag.toLowerCase().includes(q));
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Update specific field value
  const handleFieldChange = (templateId: string, fieldKey: string, value: any) => {
    setFormValues(prev => ({
      ...prev,
      [templateId]: {
        ...(prev[templateId] || {}),
        [fieldKey]: value
      }
    }));
  };

  // Helper for single emoji input
  const handleEmojiChange = (templateId: string, fieldKey: string, value: string) => {
    const chars = Array.from(value.trim());
    const val = chars.length > 0 ? chars[chars.length - 1] : '';
    handleFieldChange(templateId, fieldKey, val);
  };

  // Generate current prompt (with universal cross-device smartphone & tablet instructions)
  const currentPromptText = useMemo(() => {
    const curValues = formValues[currentTemplate.id] || {};
    const basePrompt = currentTemplate.generatePrompt(curValues);
    return `${basePrompt}\n${CROSS_DEVICE_MOBILE_GUIDELINES}`;
  }, [currentTemplate, formValues]);

  // Copy to clipboard
  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(currentPromptText);
      setCopied(true);
      setShowCelebrationModal(true);
      setTimeout(() => setCopied(false), 3500);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = currentPromptText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setShowCelebrationModal(true);
      setTimeout(() => setCopied(false), 3500);
    }
  };

  // Download Standalone HTML file
  const handleDownloadStandaloneHTML = () => {
    const promptText = currentPromptText;
    const sanitizedTitle = currentTemplate.title;
    const headerVisual = currentTemplate.id === 'memory-card'
      ? `<span class="inline-flex items-center justify-center w-8 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-black text-xl shadow-sm border border-white">?</span>`
      : currentTemplate.emoji;

    const standaloneHtmlContent = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>과학축제 바이브 코딩 - ${sanitizedTitle}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;600;800&display=swap" rel="stylesheet">
  <style> body { font-family: 'Noto Sans KR', sans-serif; } </style>
</head>
<body class="bg-gradient-to-br from-purple-50 via-amber-50 to-emerald-50 min-h-screen p-4 md:p-8 text-slate-800">
  <div class="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl border border-purple-100 p-6 md:p-10">
    <div class="flex items-center gap-3 mb-4">
      <span class="text-4xl">${headerVisual}</span>
      <div>
        <h1 class="text-2xl font-extrabold text-slate-900">과학축제 바이브 코딩 프롬프트</h1>
        <p class="text-sm text-purple-600 font-semibold">${sanitizedTitle} 완성본</p>
      </div>
    </div>
    
    <div class="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6 text-sm text-amber-900">
      💡 <strong>다음 단계 안내</strong>: 아래 프롬프트를 복사하여 <strong>Gemini (gemini.google.com)</strong>에 붙여넣으면 나만의 웹앱 코드가 즉시 생성됩니다!
    </div>

    <div class="relative mb-6">
      <textarea id="promptArea" class="w-full h-80 p-5 rounded-2xl bg-slate-900 text-emerald-300 font-mono text-sm leading-relaxed border border-slate-700 resize-y" readonly>${promptText}</textarea>
    </div>

    <div class="flex flex-col sm:flex-row gap-3">
      <button onclick="copyToClipboard()" id="copyBtn" class="flex-1 py-4 px-6 bg-gradient-to-r from-purple-600 via-indigo-600 to-emerald-600 text-white font-bold rounded-2xl shadow-lg hover:opacity-95 text-base flex items-center justify-center gap-2">
        <span>📋 프롬프트 복사하기</span>
      </button>
      <a href="${padletUrl}" target="_blank" rel="noopener noreferrer" class="py-4 px-6 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl shadow flex items-center justify-center gap-2 text-base text-center">
        <span>🎨 작품 전시장 바로가기</span>
      </a>
    </div>

    <div id="toast" class="hidden mt-4 p-4 bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-2xl text-center font-bold">
      🎉 복사 완료! 이제 Gemini에 붙여넣거나 작품 전시장(패들렛)으로 이동하세요!
    </div>
  </div>

  <script>
    function copyToClipboard() {
      const textarea = document.getElementById('promptArea');
      textarea.select();
      document.execCommand('copy');
      const toast = document.getElementById('toast');
      const copyBtn = document.getElementById('copyBtn');
      copyBtn.innerHTML = '<span>✅ 복사 완료!</span>';
      toast.classList.remove('hidden');
      setTimeout(() => {
        copyBtn.innerHTML = '<span>📋 프롬프트 복사하기</span>';
      }, 3000);
    }
  </script>
</body>
</html>`;

    const blob = new Blob([standaloneHtmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `vibe-coding-${currentTemplate.id}-prompt.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#FAF5FF] flex flex-col selection:bg-purple-200 selection:text-purple-900">
      {/* 1. Header (One-row, 3-zone contract) */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-purple-100 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Zone 1: Brand title */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 via-purple-500 to-emerald-400 flex items-center justify-center text-white shadow-sm font-black text-xl">
              ⚡
            </div>
            <div>
              <span className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 whitespace-nowrap">
                과학축제 <span className="text-purple-600">바이브 코딩</span>
              </span>
            </div>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
            <button
              onClick={() => setStep(1)}
              className={`hover:text-purple-600 transition-colors whitespace-nowrap cursor-pointer ${step === 1 ? 'text-purple-600 font-bold' : ''}`}
            >
              1. 템플릿 선택 (24종)
            </button>
            <button
              onClick={() => { if (step > 1) setStep(2); }}
              className={`hover:text-purple-600 transition-colors whitespace-nowrap cursor-pointer ${step === 2 ? 'text-purple-600 font-bold' : ''}`}
            >
              2. 세부 설정
            </button>
            <button
              onClick={() => setStep(3)}
              className={`hover:text-purple-600 transition-colors whitespace-nowrap cursor-pointer ${step === 3 ? 'text-purple-600 font-bold' : ''}`}
            >
              3. 프롬프트 복사
            </button>
            <button
              onClick={() => setShowGuideModal(true)}
              className="hover:text-purple-600 transition-colors whitespace-nowrap flex items-center gap-1 cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-amber-500" />
              <span>체험 안내</span>
            </button>
          </nav>

          {/* Zone 3: Primary Action */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={padletUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 text-xs sm:text-sm font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors whitespace-nowrap flex items-center gap-1.5 border border-purple-200 cursor-pointer shadow-xs"
              title="작품 전시장 바로가기"
            >
              <span>🎨</span>
              <span>작품 전시장</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={handleDownloadStandaloneHTML}
              className="px-3.5 py-2 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 rounded-xl transition-all shadow-sm hover:shadow flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
              title="독립 실행 가능한 단일 HTML 다운로드"
            >
              <Download className="w-3.5 h-3.5" />
              <span>HTML 저장</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. Top Progress & Hero Section */}
      <section className="bg-gradient-to-b from-purple-100/60 via-amber-50/40 to-transparent pt-6 pb-4 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Festival Announcement Badge */}
          <div className="text-center mb-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-amber-200/80 border border-amber-300 text-amber-900 rounded-full text-xs sm:text-sm font-bold">
              <span>🎪 2026 과학축제 소프트웨어 체험 부스</span>
              <span className="text-amber-700">·</span>
              <span className="text-purple-800 font-extrabold">24가지 웹앱 템플릿 완비</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-center text-slate-900 tracking-tight mb-2">
            웹앱 프롬프트 <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500">자동 생성기</span>
          </h1>
          <p className="text-center text-slate-600 text-sm sm:text-base max-w-2xl mx-auto mb-6">
            게임, 퀴즈, 시뮬레이터 중 마음에 드는 주제를 고르면, <strong className="text-slate-900">Gemini AI</strong>가 즉시 작동하는 단일 HTML 코드를 생성할 수 있도록 완벽하게 맞춤 프롬프트를 조립해 줍니다.
          </p>

          {/* Stepper Progress Bar */}
          <div className="bg-white rounded-2xl p-3 sm:p-4 shadow-sm border border-purple-100">
            <div className="flex items-center justify-between relative mb-2">
              {/* Step 1 Indicator */}
              <button
                onClick={() => setStep(1)}
                className={`flex items-center gap-2 group cursor-pointer z-10 ${step >= 1 ? 'text-purple-700' : 'text-slate-400'}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-extrabold text-sm transition-all ${
                  step === 1 ? 'bg-purple-600 text-white ring-4 ring-purple-200 shadow' : step > 1 ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  {step > 1 ? '✓' : '1'}
                </div>
                <div className="text-left hidden sm:block">
                  <div className="text-xs text-slate-400 font-semibold">STEP 1</div>
                  <div className={`text-sm font-bold ${step === 1 ? 'text-purple-700' : 'text-slate-700'}`}>템플릿 선택 (24종)</div>
                </div>
              </button>

              {/* Progress Line 1-2 */}
              <div className="flex-1 mx-2 sm:mx-4 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full bg-gradient-to-r from-purple-500 to-amber-400 transition-all duration-300 ${
                  step >= 2 ? 'w-full' : 'w-0'
                }`} />
              </div>

              {/* Step 2 Indicator */}
              <button
                onClick={() => { if (step > 1) setStep(2); }}
                className={`flex items-center gap-2 group cursor-pointer z-10 ${step >= 2 ? 'text-amber-700' : 'text-slate-400'}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-extrabold text-sm transition-all ${
                  step === 2 ? 'bg-amber-500 text-white ring-4 ring-amber-200 shadow' : step > 2 ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  {step > 2 ? '✓' : '2'}
                </div>
                <div className="text-left hidden sm:block">
                  <div className="text-xs text-slate-400 font-semibold">STEP 2</div>
                  <div className={`text-sm font-bold ${step === 2 ? 'text-amber-700' : 'text-slate-700'}`}>세부 설정</div>
                </div>
              </button>

              {/* Progress Line 2-3 */}
              <div className="flex-1 mx-2 sm:mx-4 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full bg-gradient-to-r from-amber-400 to-emerald-500 transition-all duration-300 ${
                  step >= 3 ? 'w-full' : 'w-0'
                }`} />
              </div>

              {/* Step 3 Indicator */}
              <button
                onClick={() => setStep(3)}
                className={`flex items-center gap-2 group cursor-pointer z-10 ${step === 3 ? 'text-emerald-700' : 'text-slate-400'}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-extrabold text-sm transition-all ${
                  step === 3 ? 'bg-emerald-600 text-white ring-4 ring-emerald-200 shadow' : 'bg-slate-100 text-slate-500'
                }`}>
                  3
                </div>
                <div className="text-left hidden sm:block">
                  <div className="text-xs text-slate-400 font-semibold">STEP 3</div>
                  <div className={`text-sm font-bold ${step === 3 ? 'text-emerald-700' : 'text-slate-700'}`}>프롬프트 출력 & 복사</div>
                </div>
              </button>
            </div>

            {/* Mobile step text */}
            <div className="sm:hidden text-center text-xs font-bold text-purple-700 mt-1">
              {step === 1 && '1단계: 24가지 템플릿 중 하나를 골라보세요'}
              {step === 2 && `2단계: [${currentTemplate.title}] 세부 옵션을 설정하세요`}
              {step === 3 && '3단계: 완성된 프롬프트를 복사하여 AI에 전달하세요'}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Main Body */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6">
        {/* STEP 1: Template Selection with 24 Templates & Categories */}
        {step === 1 && (
          <div className="space-y-6">
            {/* Category Tabs & Search Bar */}
            <div className="bg-white rounded-3xl p-4 sm:p-5 border border-purple-100 shadow-xs space-y-4">
              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                {/* Category Buttons */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
                  {[
                    { id: 'all' as CategoryKey, label: '전체 보기', icon: '✨', count: ALL_TEMPLATES.length },
                    { id: 'arcade' as CategoryKey, label: '아케이드 & 퍼즐', icon: '🎮', count: ALL_TEMPLATES.filter(t => t.category === 'arcade').length },
                    { id: 'quiz' as CategoryKey, label: '퀴즈 & 두뇌 훈련', icon: '🧠', count: ALL_TEMPLATES.filter(t => t.category === 'quiz').length },
                    { id: 'sim' as CategoryKey, label: '시뮬레이터 & 상호작용', icon: '🌌', count: ALL_TEMPLATES.filter(t => t.category === 'sim').length },
                    { id: 'custom' as CategoryKey, label: '자유 창작', icon: '🪄', count: ALL_TEMPLATES.filter(t => t.category === 'custom').length }
                  ].map(cat => {
                    const active = selectedCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                          active
                            ? 'bg-purple-600 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-600 hover:bg-purple-50 hover:text-purple-700'
                        }`}
                      >
                        <span>{cat.icon}</span>
                        <span>{cat.label}</span>
                        <span className={`text-[11px] px-1.5 py-0.2 rounded-full ${active ? 'bg-purple-700 text-purple-100' : 'bg-slate-200 text-slate-600'}`}>
                          {cat.count}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Search Input */}
                <div className="relative min-w-[200px] md:w-64">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="템플릿 이름/키워드 검색..."
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Helper indicator */}
              <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100">
                <span>총 <strong className="text-purple-700 font-bold">{filteredTemplates.length}</strong>개의 템플릿이 준비되어 있습니다.</span>
                <span className="hidden sm:inline">원하는 템플릿 카드를 누르면 2단계 세부 설정으로 이동합니다.</span>
              </div>
            </div>

            {/* Template Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTemplates.map((tmpl) => {
                const isSelected = selectedTemplateId === tmpl.id;
                return (
                  <div
                    key={tmpl.id}
                    onClick={() => {
                      setSelectedTemplateId(tmpl.id);
                      setStep(2);
                    }}
                    className={`relative p-5 rounded-3xl bg-white border-2 cursor-pointer transition-all duration-200 transform hover:-translate-y-1 hover:shadow-md flex flex-col justify-between ${
                      isSelected
                        ? 'border-purple-600 ring-4 ring-purple-100 shadow-md'
                        : 'border-slate-200 hover:border-purple-300 shadow-xs'
                    }`}
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between mb-2.5">
                        <span className={`text-[11px] font-black px-2 py-0.5 rounded-full border ${tmpl.badgeColor}`}>
                          {tmpl.badge}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                          {tmpl.categoryLabel}
                        </span>
                      </div>

                      {/* Emoji & Title */}
                      <div className="flex items-start gap-3 mb-2.5">
                        <div className="text-3xl p-2 bg-slate-50 rounded-2xl border border-slate-100 shrink-0 flex items-center justify-center min-w-12 min-h-12">
                          {renderTemplateIcon(tmpl, 'md')}
                        </div>
                        <div>
                          <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                            {tmpl.title}
                          </h3>
                          <p className="text-xs text-slate-500 font-medium mt-0.5 line-clamp-1">
                            {tmpl.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-slate-600 leading-relaxed mb-3 line-clamp-2">
                        {tmpl.desc}
                      </p>
                    </div>

                    <div>
                      {/* Tags */}
                      <div className="flex flex-wrap items-center gap-1 text-[11px] text-slate-600 pt-2 border-t border-slate-100 mb-2">
                        {tmpl.tags.map((t, idx) => (
                          <React.Fragment key={t}>
                            <span>{t}</span>
                            {idx < tmpl.tags.length - 1 && <span className="text-slate-400">·</span>}
                          </React.Fragment>
                        ))}
                      </div>

                      {/* Action Arrow */}
                      <div className="flex items-center justify-between text-xs font-bold text-purple-600 pt-1">
                        <span className="text-slate-600 font-normal">설정 항목 4가지</span>
                        <span className="flex items-center gap-0.5 group">
                          선택하기 <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredTemplates.length === 0 && (
              <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
                <div className="text-4xl mb-3">🔍</div>
                <h3 className="text-lg font-bold text-slate-800">검색 결과가 없습니다</h3>
                <p className="text-xs text-slate-500 mt-1">다른 검색어를 입력하거나 카테고리 필터를 변경해 보세요.</p>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                  className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-xl text-xs font-bold cursor-pointer"
                >
                  전체 템플릿 보기
                </button>
              </div>
            )}
          </div>
        )}

        {/* STEP 2: Tailored Detail Settings for the Selected Template */}
        {step === 2 && (
          <div className="space-y-6">
            {/* Header info */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-purple-100 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="text-4xl p-2 bg-purple-50 rounded-2xl border border-purple-100 flex items-center justify-center min-w-14 min-h-14">
                  {renderTemplateIcon(currentTemplate, 'lg')}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-purple-600">선택된 템플릿</span>
                    <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                      {currentTemplate.categoryLabel}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                    {currentTemplate.title}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {currentTemplate.subtitle}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setStep(1)}
                className="px-3.5 py-1.5 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>다른 템플릿 고르기</span>
              </button>
            </div>

            {/* Cross-Device / Mobile Play Notice Card */}
            <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-4 border border-blue-200/80 shadow-xs flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xl shrink-0 shadow-xs font-bold">
                  📱
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-xs sm:text-sm">
                      노트북 제작 ➜ 스마트폰 · 태블릿 · PC 전기기 플레이 지원
                    </span>
                    <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-extrabold text-[10px]">
                      자동 최적화
                    </span>
                  </div>
                  <p className="text-slate-600 text-xs mt-0.5 leading-relaxed">
                    노트북으로 코드를 생성하지만 스마트폰에서도 화면 밖으로 넘치지 않게 <strong>세로 뷰포트 비율(100dvh)</strong>과 <strong>모바일 전용 터치 조작 방식(가상 버튼/스와이프)</strong>이 프롬프트에 자동으로 포함됩니다.
                  </p>
                </div>
              </div>
            </div>

            {/* Dynamic Form Controls for this Template */}
            <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-xs space-y-6">
              <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                    <Sliders className="w-5 h-5 text-purple-600" />
                    <span>프롬프트 세부 설정 (4가지 맞춤 파라미터)</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    원하는 선택지를 클릭하거나 직접 수정하세요. Gemini AI가 이 설정을 바탕으로 웹앱을 구현합니다.
                  </p>
                </div>
              </div>

              {/* Render each field defined for this template */}
              <div className="space-y-6">
                {currentTemplate.fields.map((field, fIdx) => {
                  const currentValue = formValues[currentTemplate.id]?.[field.key] ?? field.defaultValue;

                  return (
                    <div key={field.key} className={`space-y-2 ${fIdx > 0 ? 'pt-5 border-t border-slate-100' : ''}`}>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <label className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                          <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-700 text-xs font-black flex items-center justify-center">
                            {fIdx + 1}
                          </span>
                          <span>{field.label}</span>
                          <span className="text-purple-600">*</span>
                        </label>
                      </div>
                      {field.sublabel && (
                        <p className="text-xs text-slate-500">{field.sublabel}</p>
                      )}

                      {/* Field Type: EMOJI */}
                      {field.type === 'emoji' && (
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                          <div className="flex items-center gap-2">
                            <div className="w-14 h-14 rounded-2xl bg-purple-50 border-2 border-purple-300 flex items-center justify-center text-3xl shadow-inner shrink-0">
                              {currentValue || '❓'}
                            </div>
                            <input
                              type="text"
                              maxLength={2}
                              value={currentValue}
                              onChange={(e) => handleEmojiChange(currentTemplate.id, field.key, e.target.value)}
                              placeholder="직접 입력"
                              className="w-32 px-3 py-2.5 rounded-xl border border-slate-300 text-center font-bold text-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                          </div>
                          {field.presets && (
                            <div className="flex-1 flex flex-wrap items-center gap-1.5 p-2 bg-slate-50 rounded-2xl border border-slate-200">
                              <span className="text-xs font-semibold text-slate-500 mr-1 ml-1">추천:</span>
                              {field.presets.map((pEmoji) => (
                                <button
                                  key={pEmoji}
                                  type="button"
                                  onClick={() => handleFieldChange(currentTemplate.id, field.key, pEmoji)}
                                  className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg hover:scale-110 transition-all cursor-pointer ${
                                    currentValue === pEmoji ? 'bg-purple-600 text-white shadow-xs' : 'bg-white hover:bg-purple-100 border border-slate-200'
                                  }`}
                                >
                                  {pEmoji}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Field Type: NUMBER */}
                      {field.type === 'number' && (
                        <div className="flex items-center gap-3 max-w-xs">
                          <button
                            type="button"
                            onClick={() => {
                              const min = field.min ?? 1;
                              const step = field.step ?? (field.key === 'scorePerSuccess' ? 5 : 1);
                              handleFieldChange(currentTemplate.id, field.key, Math.max(min, Number(currentValue) - step));
                            }}
                            className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 font-black text-lg hover:bg-slate-200 flex items-center justify-center cursor-pointer"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            min={field.min ?? 1}
                            max={field.max ?? 100}
                            value={currentValue}
                            onChange={(e) => handleFieldChange(currentTemplate.id, field.key, parseInt(e.target.value) || field.defaultValue)}
                            className="flex-1 text-center font-black text-lg py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const max = field.max ?? 100;
                              const step = field.step ?? (field.key === 'scorePerSuccess' ? 5 : 1);
                              handleFieldChange(currentTemplate.id, field.key, Math.min(max, Number(currentValue) + step));
                            }}
                            className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 font-black text-lg hover:bg-slate-200 flex items-center justify-center cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      )}

                      {/* Field Type: TEXT */}
                      {field.type === 'text' && (
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={currentValue}
                            onChange={(e) => handleFieldChange(currentTemplate.id, field.key, e.target.value)}
                            placeholder={field.placeholder || '내용을 입력하세요'}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                      )}

                      {/* Field Type: TEXTAREA */}
                      {field.type === 'textarea' && (
                        <div className="space-y-2">
                          <textarea
                            rows={3}
                            value={currentValue}
                            onChange={(e) => handleFieldChange(currentTemplate.id, field.key, e.target.value)}
                            placeholder={field.placeholder || '자세한 설명을 입력하세요'}
                            className="w-full px-4 py-3 rounded-xl border border-slate-300 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                      )}

                      {/* Field Type: CHIPS (Text with Preset Buttons) */}
                      {field.type === 'chips' && (
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={currentValue}
                            onChange={(e) => handleFieldChange(currentTemplate.id, field.key, e.target.value)}
                            placeholder={field.placeholder || '직접 입력하거나 아래 버튼을 누르세요'}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                          {field.presets && (
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {field.presets.map((preset) => {
                                const isCurrent = currentValue === preset;
                                return (
                                  <button
                                    key={preset}
                                    type="button"
                                    onClick={() => handleFieldChange(currentTemplate.id, field.key, preset)}
                                    className={`text-xs px-2.5 py-1.5 rounded-xl transition-all font-medium border cursor-pointer ${
                                      isCurrent
                                        ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                                        : 'bg-slate-100 hover:bg-purple-100 text-slate-700 border-slate-200'
                                    }`}
                                  >
                                    {preset}
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Live Recipe Preview Box */}
            <div className="bg-gradient-to-r from-purple-500/10 via-amber-500/10 to-emerald-500/10 border border-purple-200 rounded-3xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span className="text-xs font-black text-purple-900 tracking-wider">실시간 완성 프롬프트 미리보기 요약</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                <strong className="text-purple-800">[{currentTemplate.title}]</strong>에 대한 4가지 맞춤 설정이 반영되어
                단일 HTML 파일로 실행 가능한 완성형 프롬프트가 조립됩니다.
              </p>
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-5 py-3 rounded-2xl bg-white border border-slate-300 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>이전 단계</span>
              </button>

              <button
                type="button"
                onClick={() => setStep(3)}
                className="flex-1 sm:flex-initial px-8 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-emerald-600 text-white font-black text-base shadow-md hover:shadow-lg hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
              >
                <span>프롬프트 제작하기</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Prompt Output and Copy */}
        {step === 3 && (
          <div className="space-y-6">
            {/* Header Notification */}
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-5 sm:p-6 text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-2xl shrink-0">
                  {renderTemplateIcon(currentTemplate, 'md')}
                </div>
                <div>
                  <div className="text-xs font-bold text-emerald-100 uppercase tracking-wider">
                    프롬프트 조립 완성 ({currentTemplate.title})
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black">
                    바이브 코딩 프롬프트가 준비되었습니다!
                  </h2>
                </div>
              </div>
              <button
                onClick={handleCopyPrompt}
                className="px-6 py-3 bg-white text-emerald-800 font-black rounded-2xl shadow hover:bg-emerald-50 transition-all flex items-center justify-center gap-2 self-start sm:self-auto cursor-pointer text-sm"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-emerald-600" />}
                <span>{copied ? '복사되었습니다!' : '지금 바로 복사하기'}</span>
              </button>
            </div>

            {/* Large Textarea with Generated Prompt */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-purple-600" />
                  <span className="text-xs font-bold text-slate-700">생성된 프롬프트 전문 (Gemini 1.5 / 3.8 Flash 최적화)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-md flex items-center gap-1">
                    📱 스마트폰 터치/화면비율 가이드 포함
                  </span>
                  <span className="text-xs text-slate-400 hidden sm:inline">클릭하면 전체 선택됩니다</span>
                </div>
              </div>

              <div className="relative">
                <textarea
                  readOnly
                  value={currentPromptText}
                  onClick={(e) => (e.target as HTMLTextAreaElement).select()}
                  rows={13}
                  className="w-full p-4 sm:p-5 rounded-2xl bg-slate-900 text-emerald-300 font-mono text-xs sm:text-sm leading-relaxed border border-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-y shadow-inner"
                />
              </div>

              {/* Big Main Copy Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleCopyPrompt}
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-emerald-600 text-white font-black text-base sm:text-lg shadow-lg hover:shadow-xl hover:opacity-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="w-6 h-6 text-emerald-200" />
                      <span>복사 완료! 이제 패들렛으로 이동하세요 🎉</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-6 h-6" />
                      <span>📋 프롬프트 복사하기 (클릭 시 자동 복사)</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* 3-Step Festival Mission Walkthrough */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-purple-100 shadow-xs space-y-4">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span>체험 참가자를 위한 3단계 미션 가이드</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100">
                  <div className="w-7 h-7 rounded-full bg-purple-600 text-white font-extrabold text-xs flex items-center justify-center mb-2">
                    1
                  </div>
                  <h4 className="text-sm font-black text-purple-900 mb-1">프롬프트 복사</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    위 [프롬프트 복사하기] 버튼을 눌러 완성된 텍스트를 복사합니다.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-100">
                  <div className="w-7 h-7 rounded-full bg-amber-500 text-white font-extrabold text-xs flex items-center justify-center mb-2">
                    2
                  </div>
                  <h4 className="text-sm font-black text-amber-900 mb-1">Gemini AI에 입력</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Gemini 채팅창에 붙여넣기(Ctrl+V)하면 AI가 10초 만에 완벽한 단일 HTML 코드를 짜줍니다!
                  </p>
                  <a
                    href="https://gemini.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 hover:text-amber-800 underline mt-2"
                  >
                    <span>Gemini 열기</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100">
                  <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-extrabold text-xs flex items-center justify-center mb-2">
                    3
                  </div>
                  <h4 className="text-sm font-black text-emerald-900 mb-1">패들렛에 자랑하기</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    AI가 만든 코드를 확인해보고 축제 패들렛 게시판에 등록하여 친구들과 공유하세요!
                  </p>
                  <a
                    href={padletUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 hover:text-emerald-800 underline mt-2"
                  >
                    <span>작품 전시장 열기</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Actions Footer */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-5 py-3 rounded-2xl bg-white border border-slate-300 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>옵션 수정하기 (Step 2)</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-5 py-3 rounded-2xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-700 font-bold text-sm transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>새 템플릿 선택 (24종)</span>
                </button>

                <a
                  href={padletUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
                >
                  <span>🎨 작품 전시장 바로가기</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 4. Footer */}
      <footer className="mt-12 border-t border-purple-100 bg-white py-6 px-4 sm:px-6 text-center text-xs text-slate-500">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-medium">
            <span>🔬 2026 과학축제 바이브 코딩 체험 부스</span>
            <span>·</span>
            <span>총 24개 맞춤형 템플릿 완비</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowGuideModal(true)}
              className="text-purple-600 hover:underline cursor-pointer"
            >
              부스 운영 가이드
            </button>
            <span>·</span>
            <button
              onClick={handleDownloadStandaloneHTML}
              className="text-emerald-600 hover:underline cursor-pointer font-bold"
            >
              단일 HTML 파일 다운로드
            </button>
          </div>
        </div>
      </footer>

      {/* MODAL 1: Celebration / Copy Success Modal */}
      {showCelebrationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-purple-100 text-center relative">
            <button
              onClick={() => setShowCelebrationModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl mx-auto mb-4 animate-bounce">
              🎉
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-2">
              복사 완료! 이제 작품 전시장으로 이동하세요!
            </h3>

            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              <strong className="text-purple-700">[{currentTemplate.title}]</strong> 프롬프트가 클립보드에 안전하게 복사되었습니다.<br />
              <strong className="text-purple-700">Gemini</strong>에서 웹앱 코드를 만들고 <strong className="text-emerald-700">작품 전시장</strong>에 멋진 작품을 자랑해보세요!
            </p>

            <div className="space-y-2.5">
              <a
                href={padletUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowCelebrationModal(false)}
                className="w-full py-3.5 px-4 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold rounded-2xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer text-base"
              >
                <span>🎨 작품 전시장으로 바로 이동하기</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <a
                href="https://gemini.google.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowCelebrationModal(false)}
                className="w-full py-3 px-4 bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold rounded-2xl border border-purple-200 flex items-center justify-center gap-2 transition-all cursor-pointer text-sm"
              >
                <span>🤖 Gemini AI 열기 (gemini.google.com)</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                onClick={() => setShowCelebrationModal(false)}
                className="w-full py-2.5 text-xs text-slate-500 hover:text-slate-700 font-semibold cursor-pointer"
              >
                창 닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Padlet URL Settings Modal */}
      {showPadletConfig && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-purple-100 relative">
            <button
              onClick={() => setShowPadletConfig(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center text-lg">
                📌
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">축제 패들렛(Padlet) 주소 설정</h3>
                <p className="text-xs text-slate-500">부스 운영용 공유 게시판 URL을 입력하세요</p>
              </div>
            </div>

            <div className="space-y-3 mb-5">
              <label className="block text-xs font-bold text-slate-700">
                패들렛 게시판 링크 (URL)
              </label>
              <input
                type="url"
                defaultValue={padletUrl}
                id="padletInput"
                placeholder="https://padlet.com/your-festival-board"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-mono text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
              <p className="text-[11px] text-slate-400">
                브라우저에 저장되어 축제 기간 동안 유지됩니다.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowPadletConfig(false)}
                className="px-4 py-2 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer"
              >
                취소
              </button>
              <button
                type="button"
                onClick={() => {
                  const input = document.getElementById('padletInput') as HTMLInputElement;
                  if (input && input.value) {
                    handleSavePadletUrl(input.value);
                  }
                }}
                className="px-4 py-2 text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 rounded-xl cursor-pointer shadow-xs"
              >
                저장하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Booth Guide Modal */}
      {showGuideModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-purple-100 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowGuideModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🎪</span>
              <div>
                <h3 className="text-xl font-black text-slate-900">과학축제 바이브 코딩 체험 꿀팁</h3>
                <p className="text-xs text-slate-500">24가지 템플릿 부스 지도 안내</p>
              </div>
            </div>

            <div className="space-y-4 text-sm text-slate-700 leading-relaxed mb-6">
              <div className="p-3.5 bg-purple-50 rounded-2xl border border-purple-100">
                <div className="font-bold text-purple-900 text-xs mb-1">🎮 카테고리별 추천 대상</div>
                <div className="text-xs text-purple-800 space-y-1">
                  <div>• <strong>아케이드 & 퍼즐</strong>: 초등 저/중학년 (스네이크, 카드 뒤집기, 장애물 피하기)</div>
                  <div>• <strong>퀴즈 & 두뇌</strong>: 초등 고학년/중학생 (영단어, 어림값, 딜레마 저울)</div>
                  <div>• <strong>시뮬레이터 & 상호작용</strong>: 학부모 & 중학생 (별자리, 태양계, 런치패드, MBTI)</div>
                </div>
              </div>

              <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-100">
                <div className="font-bold text-amber-900 text-xs mb-1">부스 진행 순서 추천 (소요시간: 5~10분)</div>
                <ol className="text-xs text-amber-900 list-decimal list-inside space-y-1">
                  <li><strong>스텝 1</strong>: 24종 중 마음에 드는 웹앱 템플릿 선택</li>
                  <li><strong>스텝 2</strong>: 좋아하는 캐릭터, 규칙, 배경, 분위기 설정</li>
                  <li><strong>스텝 3</strong>: 프롬프트 복사 버튼 클릭!</li>
                  <li><strong>Gemini 1.5 Flash / 3.8 Flash</strong>에 붙여넣어 생성된 코드를 실행</li>
                  <li><strong>패들렛 게시판</strong>에 결과물 캡처 또는 링크 등록</li>
                </ol>
              </div>
            </div>

            <button
              onClick={() => setShowGuideModal(false)}
              className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-2xl transition-colors cursor-pointer text-sm"
            >
              확인했습니다
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
