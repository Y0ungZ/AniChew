<div id="top"></div>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<br />
<div align="center">
  <img src="https://user-images.githubusercontent.com/61743793/136696085-678fa857-4a24-4c40-87f9-0d108aeeb2c0.png" width="250px"/>

  <p align="center">
    애니메이션 추천 사이트
    <br />
    <a href="https://github.com/othneildrew/Best-README-Template"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://youtu.be/ev11NzQUbos">유튜브 시연 영상</a>
    ·
    <a href="https://github.com/Y0ungZ/AniChew/issues">Report Bug</a>
    ·
    <a href="https://github.com/Y0ungZ/AniChew/issues">Request Feature</a>
  </p>
</div>

<!-- INTRODUCE MEMBER -->

## 🧑 팀원소개

|                                             [김경원](https://github.com/shining8543)                                             |                                               [노영주](https://github.com/Y0ungZ)                                                |                                               [김문희](https://github.com/munimun)                                               |                                             [장준혁](https://github.com/95rolancia)                                              |
| :------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://user-images.githubusercontent.com/41102293/130561099-a6ef11d4-68bd-4f98-89ea-b232604cb47e.png" width="250px"/> | <img src="https://user-images.githubusercontent.com/41102293/130561101-bf389c47-397e-4a82-9f11-ef842e403605.png" width="250px"/> | <img src="https://user-images.githubusercontent.com/41102293/130561100-aca30a21-2f9b-4154-969e-1afc64654a92.png" width="250px"/> | <img src="https://user-images.githubusercontent.com/41102293/130561093-3e81caa1-a718-46b3-9adf-6ad372c59de8.png" width="250px"/> |
|                                                      shining8543@naver.com                                                       |                                                         at8in@naver.com                                                          |                                                       ansgml6491@naver.com                                                       |                                                       95jjangjun@gmail.com                                                       |
|                          항상 고민하고 선택에 대해서 "왜" 라며 이유를 <br/>찾는 개발자가 되고 싶습니다                           |                                          끊임없이 반성하고 배우는 개발자가 되겠습니다.                                           |                                                유용한걸 만드는 사람이 되겠습니당~                                                |                                            꾸준히 성장할 수 있는 개발자가 되겠습니다.                                            |
|                                                             Back-End                                                             |                                                            Front-End                                                             |                                                             Big-Data                                                             |                                                            Front-End                                                             |

## 목차

  <ol>
    <li><a href="#프로젝트-설명">프로젝트 설명</a></li>
    <li><a href="#기술-스택">기술 스택</a></li>
    <li><a href="#빠른-시작">빠른 시작</a></li>
    <li><a href="#아키텍쳐">아키텍쳐</a></li>
    <li><a href="#참고">참고</a></li>
    <li><a href="#라이센스">라이센스</a></li>
  </ol>

<!-- ABOUT THE PROJECT -->

## 프로젝트 설명

1. 애니메이션 평점 및 리뷰 기능
2. 애니메이션 추천 기능 (평점 및 좋아요 기반)
3. 피규어 알람 기능
4. 반응형 웹 페이지
   ![이미지](https://i.imgur.com/oxIrDvN.gif)

## 기술 스택

#### front-end

- UI Library
  - [React](https://reactjs.org)
- State management Library
  - [MobX](https://mobx.js.org/README.html)
- design
  - [antd](https://ant.design)

#### back-end

- REST API
  - [Spring boot](https://spring.io/projects/spring-boot)
- User 및 Animation 관련 데이터를 위한 DB
  - [MySQL](https://www.mysql.com)
- Token 관리용 DB
  - Redis [LINUX](https://redis.io)/[Windows](https://github.com/microsoftarchive/redis/releases/tag/win-3.0.504)

<!-- GETTING STARTED -->

## 빠른 시작

### Front-End

```
$ git clone https://github.com/Y0ungZ/AniChew.git
$ cd AniChew/front-end
$ touch .env.development.local
$ yarn
$ yarn start
```

### front-end env setting

```
REACT_APP_API_DOMAIN_URL=https://localhost:8080
REACT_APP_IMAGE_BASE_URL=
REACT_APP_KAKAO_CLIENT_ID=
REACT_APP_KAKAO_REDIRECT_URI=
REACT_APP_KAKAO_AUTH_URL=
```

### Back-End

```
$ cd AniChew/back-end
$ mvn package
$ java -jar {jar파일이름}
```

<!-- ARCHITECTURE -->

## 아키텍쳐

![아키텍쳐](https://user-images.githubusercontent.com/61743793/136696353-b2c96405-2143-4bd6-a7c6-22833548845b.JPG)

## 참고

- [노션(기획서, 스크럼, 그라운드/개발 규칙)](https://encouraging-stop-fdd.notion.site/4-582c29085c214996ac782a3328c3a658)
- [와이어프레임](https://www.figma.com/file/6sWi0PI1JncVGzJTcDECJS/와이어프레임?node-id=0%3A1)
- [프로젝트 회고](https://encouraging-stop-fdd.notion.site/90c4d9d37deb4e57b2f508426b847810)

<!-- LICENSE -->

## 라이센스

Distributed under the MIT License. See `LICENSE` for more information.

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/Y0ungZ/AniChew.svg?style=for-the-badge
[contributors-url]: https://github.com/Y0ungZ/AniChew/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Y0ungZ/AniChew.svg?style=for-the-badge
[forks-url]: https://github.com/Y0ungZ/AniChew/network/members
[stars-shield]: https://img.shields.io/github/stars/Y0ungZ/AniChew.svg?style=for-the-badge
[stars-url]: https://github.com/Y0ungZ/AniChew/stargazers
[issues-shield]: https://img.shields.io/github/issues/Y0ungZ/AniChew.svg?style=for-the-badge
[issues-url]: https://github.com/Y0ungZ/AniChew/issues
[license-shield]: https://img.shields.io/github/license/Y0ungZ/AniChew.svg?style=for-the-badge
[license-url]: https://github.com/Y0ungZ/AniChew/blob/master/license.txt
[product-screenshot2]: https://user-images.githubusercontent.com/41102293/130556791-b466d883-effe-403b-be20-a881ec149851.png
[product-screenshot1]: https://user-images.githubusercontent.com/41102293/130557312-e3ac3bdb-2a62-4c23-a606-d55460033a0d.png
