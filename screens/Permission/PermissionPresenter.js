import React from "react";
import styled from "styled-components/native";
import ScrollContainer from "../../components/ScrollContainer";
import { apiImage } from "../../api";
import { Dimensions, ActivityIndicator, Text } from "react-native";
import Poster from "../../components/Poster";
import Votes from "../../components/Votes";
import { formatDate } from "../../utils";
import { TouchableOpacity } from "react-native-gesture-handler";
import Link from "../../components/Detail/Link";

const BG = styled.Image`
 width: 100%;
 height: 100%;
 opacity: 0.4;
 position: absolute;
`;

const Header = styled.View`
 height: ${Dimensions.get("window").height / 3}px;
 align-items: center;
 justify-content: flex-start;
`;

const Container = styled.View`
 flex-direction: row;
 align-items: center;
 top: 30px;
`;

const Info = styled.View`
 width: 50%;
 margin-left: 40px;
`;

const Title = styled.Text`
 color: white;
 font-weight: 600;
 font-size: 24px;
 margin-bottom: 10px;
`;

const Data = styled.View`
 margin-top: 30px;
 padding: 0px 30px;
`;

const DataName = styled.Text`
 margin-top: 30px;
 color: white;
 opacity: 0.8;
 font-weight: 800;
 margin-bottom: 15px;
`;

const DataValue = styled.Text`
 color: white;
 opacity: 0.8;
 font-weight: 500;
`;

export default ({ openBrowser, result, loading }) => (
 <ScrollContainer loading={false} contentContainerStyle={{ paddingBottom: 80 }}>
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
     <Text>
      선택적 접근권한은 기능 사용시 허용이 필요하며, 비허용시에도 해당기능 외
      서비스 이용이 가능합니다.
     </Text>
    </Container>
    <Container>
     <DataName>접근권한 변경방법</DataName>
     <DataValue>휴대폰 설정 {">"} 앱</DataValue>
    </Container>
   </Data>
  </>
 </ScrollContainer>
);
