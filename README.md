# Grade Quest Arena

1. 초기화면으로 학점전선(메인제목- 굵은 글씨 )F급 용사의 반격(부제)  타이포그래피를 딱 띄우고 글씨가 2초간 점점 희미해지면서 로그인 화면으로 변경, 

2. 로그인 화면의 요소를 120% 크기를 키우기

3.모든 파일을 jsx 를 사용해서 다시 수정해줘

4. 파일 jsx로 만들고 스타일 js로 빼서 styled-components만 담기게 해서 jsx에는 import * as S?였던 것 같은데 이걸 를 써서 페이지랑 스타일을 깔끔하게 분리해줘

5.교수님들 사진과 내사진 , 비어있는 사진들을 사람형태로 (약간 치이카와 같은 너무 치이카와 같으면 안됨) 변경해줘 일단 사진을 채우고 나중에 설정에서 선택해서 사용자가 바꿀 수 있게 해줘(근데 설정은 구현 안할 거라 그냥 일단 이미지만 채워줘)

6. 던전 화면에서 교수님과 나의 배치를  좀더 닌텐도 포켓몬스터에서 포켓몬 배틀을 하는 구도로 바꿔줘 그리고 과제 ,,등 공격요소를 좀더 게임 스러운 느낌( 예를 들면 포켓몬스터 남은 볼 갯수라던지 과제어택, 처럼 이름도 게임스럽게 바꿔줘)

7.지금 던전 입장하면 필살기가 다른 스킬들을 쓰면 충전이 되어서 쓸 수 있게 되는데 그거 없애주고 필살기 이름을 대천사로 바꾸고 학생사진 상단으로 옮겨서 나의 수호 천사같은 느낌으로 해주고 한 번만 사용할 수 있게 해줘 그리고 여기에 ai 기능을 쓸거야.

8. 던전 생성할 때 강의 계획표에 있는 출결, 과제, 중간, 기말의 비율에 따라 스킬을 쓸 수 있고 그 비율에 맞게만 공격이되는걸로하고, 예를들어 출결이 부족하거나 과제제출을 안해서 교수님을 토벌하지 못하면 토벌실패로 끝나고 성적을 입력할 수 있어야해, 비율에 따라 출석을 누를 수 있는 횟수 등이 정해져서 토벌을 하는경우와 토벌을 하지 못하는 경우가 나뉘어야해 , 토벌성공은 A+부터 B0까지고 토벌실패는 C+부터 F야

9. 전시관 swiper 라이브러리를 가져와서 한 화면에 뜨는 카드 수를 3개로 설정하고 옆으로 넘어가는 걸 인식할 수 있게 작은 화살표를 양옆에 배치해줘 그리고 카드 3개중에 중가운데 있는걸 가장 크게 배치하고 양옆은 사다리꼴/ 마름모 약간 비스듬하게 되어서 입체감있게 배치하고 글고 양옆은 투명도도 넣어서 넘어간 느낌이 나게 수정해줘

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/419e8132-014c-43bf-99d8-07b7d9fabd70).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
