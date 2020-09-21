import React from "react";
import styled from "styled-components/native";
import ScrollContainer from "../../components/ScrollContainer";

import { getStatusBarHeight } from "react-native-status-bar-height";

const statusBarHeight = getStatusBarHeight();
const Header = styled.View`
 justify-content: flex-start;
 margin-left: 40px;
 margin-top: 20px;
`;

const Container = styled.View`
 flex: 1;
 flex-direction: column;
 align-items: flex-start;
`;

const Info = styled.View`
 width: 100%;
 margin-left: 40px;
 margin-top: ${statusBarHeight}px;
`;

const Title = styled.Text`
 color: #0d0d0d;
 font-weight: 400;
 font-size: 20px;
 margin-bottom: 10px;
`;

const Data = styled.View`
 margin-top: 0px;
 padding: 0px 0px;
`;

const DataName = styled.Text`
 margin-top: 30px;
 color: #0d0d0d;
 opacity: 0.8;
 font-weight: bold;
 margin-left: 40px;
 flex: 1;
`;

const DataValue = styled.Text`
 margin-left: 40px;
 margin-right: 40px;
 color: #606060;
 opacity: 0.8;
 font-weight: 500;
 flex: 1;
`;

const DataValueRed = styled.Text`
 margin-left: 40px;
 margin-right: 40px;
 color: #606060;
 opacity: 0.8;
 font-weight: 500;
 flex: 1;
 background-color: #fbf9fa;
 border-radius: 5px;
 padding: 10px;
 margin-top: 10px;
`;

const OuterContainer = styled.View`
 flex: 1;
 margin: 1px;

 margin-top: ${statusBarHeight}px;
`;

const Modal = styled.View`
 flex: 1;
 margin: 20px;
 border-radius: 5px;
 flex-direction: column;
 background-color: white;
`;

const ModalHeader = styled.View`
 align-items: flex-start;
`;
const ModalHeaderTitle = styled.Text`
 color: #0d0d0d;
 font-weight: bold;
 font-size: 20px;
 margin-bottom: 10px;
`;
const ModalFooter = styled.View`
 position: absolute;
 bottom: 0px;
 left: 0px;
 right: 0px;
 height: 50px;
 align-items: flex-end;
 opacity: 0.8;
`;

const ConfirmBtn = styled.TouchableOpacity`
 width: 100px;
 margin-right: 20px;
 margin-left: 20px;
 margin-top: 10px;
 padding-top: 5px;
 padding-bottom: 5px;
 background-color: #3e50b4;
 border-radius: 5px;
`;
const ConfirmBtnText = styled.Text`
 text-align: center;
 color: white;
`;

export default ({ confrimBtnClicked }) => (
 <OuterContainer>
  <Modal>
   <ModalHeader>
    <Info>
     <ModalHeaderTitle>접근 권한 안내</ModalHeaderTitle>
    </Info>
   </ModalHeader>
   <ScrollContainer
    loading={false}
    contentContainerStyle={{
     paddingBottom: 80,
     backgroundColor: "transparent",
     marginTop: 0,
     paddingTop: 0,
    }}
    refreshOn={false}
   >
    <>
     <Data>
      <Header>
       <Title>필수적 접근</Title>
      </Header>
      <Container>
       <DataName>전화</DataName>
       <DataValue>
        휴대폰 정보 확인통화 회원가입 및 로그인, 법인 담당자 및 관리자 전화연결
       </DataValue>
      </Container>
      <Container>
       <DataName>카메라</DataName>
       <DataValue>필수 및 추가 서류 등의 사진 촬영 기능</DataValue>
      </Container>
      <Container>
       <DataName>사진/미디어/파일권한</DataName>
       <DataValueRed>
        필수적 접근권한 항목은 서비스의 실행을 위해 반드시 필요하며, 허용하지
        않을 경우 서비스의 이용이 제한 됩니다.
       </DataValueRed>
      </Container>
      <Container>
       <Header style={{ marginTop: 50 }}>
        <Title>선택적 접근</Title>
       </Header>
      </Container>
      <Container>
       <DataName>위치</DataName>
       <DataValue>
        내 주변 매장 찾기, 운행기록 서비스 이용, 배차현황 서비스 이용
       </DataValue>
      </Container>
      <Container>
       <DataName>카메라</DataName>
       <DataValue>배차현황 서비스 이용 시 인수증 등록</DataValue>
      </Container>
      <Container>
       <DataName>저장공간</DataName>
       <DataValue>배차현황 서비스 이용 시 인수증 등록</DataValue>
      </Container>
      <Container>
       <DataName>NOTIFICION 알림</DataName>
       <DataValue>신규 알림 아이콘 알림</DataValue>
      </Container>
      <Container>
       <DataValueRed>
        선택적 접근권한은 기능 사용시 허용이 필요하며, 비허용시에도 해당기능 외
        서비스 이용이 가능합니다.
       </DataValueRed>
      </Container>
      <Container>
       <DataName>접근권한 변경방법</DataName>
       <DataValue>휴대폰 설정 {">"} 앱</DataValue>
      </Container>
     </Data>
    </>
   </ScrollContainer>
   <ModalFooter>
    <ConfirmBtn onPress={confrimBtnClicked}>
     <ConfirmBtnText>확인</ConfirmBtnText>
    </ConfirmBtn>
   </ModalFooter>
  </Modal>
 </OuterContainer>
);
