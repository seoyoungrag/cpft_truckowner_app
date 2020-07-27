import React from "react";
import styled from "styled-components/native";
import ScrollContainer from "../../components/ScrollContainer";

const BG = styled.Image`
 width: 100%;
 height: 100%;
 opacity: 0.4;
 position: absolute;
`;

const Header = styled.View`
 justify-content: flex-start;
`;

const Container = styled.View`
 flex: 1;
 flex-direction: column;
 align-items: flex-start;
 top: 30px;
`;

const Info = styled.View`
 width: 50%;
 margin-left: 40px;
`;

const Title = styled.Text`
 color: #FFFFFF;
 font-weight: 600;
 font-size: 24px;
 margin-bottom: 10px;
`;

const Data = styled.View`
 margin-top: 0px;
 padding: 0px 0px;
`;

const DataName = styled.Text`
 margin-top: 30px;
 color: white;
 opacity: 0.8;
 font-weight: bold;
 margin-bottom: 15px;
 margin-left: 40px;
 flex: 1;
`;

const DataValue = styled.Text`
 margin-left: 40px;
 margin-right: 40px;
 color: white;
 opacity: 0.8;
 font-weight: 500;
 flex: 1;
`;

const DataValueRed = styled.Text`
 margin-left: 40px;
 margin-right: 40px;
 color: #FFFFFF;
 opacity: 0.8;
 font-weight: 500;
 flex: 1;
 background-color: #1283FA;
 border-radius: 10px;
 padding: 10px;
 margin-top: 10px;
`;

const OuterContainer = styled.View`
flex: 1;
margin: 10px;
`;

const Modal = styled.View`
flex:1;
margin:40px;
border-radius: 10px;
flex-direction: column;
background-color: #3A99FC;
`;

const ModalBody = styled.View`
`;

const ModalFooter = styled.View`

position: absolute;
bottom: 0px;
left: 0px;
right: 0px;
height: 50px;
align-items: flex-end;
`;

const ConfirmBtn = styled.TouchableOpacity`
    width: 100px;
    margin-right:20px;
    margin-left:20px;
    margin-top:10px;
    padding-top:5px;
    padding-bottom:5px;
    background-color:#8FC5FC;
    border-radius:10px;
`;
const ConfirmBtnText = styled.Text`
text-align: center;
color:#0378F1;
`;

export default ({confrimBtnClicked}) => (
    <OuterContainer>
<Modal>
 <ScrollContainer loading={false} contentContainerStyle={{ paddingBottom: 80, backgroundColor:"transparent" }} refreshOn={false}>
  <>
   <Header>
    <Container>
     <Info>
      <Title>접근권한</Title>
     </Info>
    </Container>
   </Header>
   <Data>
    <Container>
     <Info>
      <Title>선택적 접근</Title>
     </Info>
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
 <ModalFooter><ConfirmBtn onPress={confrimBtnClicked}><ConfirmBtnText>확인</ConfirmBtnText></ConfirmBtn></ModalFooter>
 </Modal>
 </OuterContainer>
);
