## 전역저장소는 swr을 사용하였습니다.

## customAlert의 경우 \_app에서 정의하였습니다.

## index페이지에서 Main 컴포넌트를 바라보며 해당 컴포넌트에서 모든 항목들이 파생 됩니다.

## api리턴 규격은 response_code:code,result:[] 로 맞춥니다. 이는 테스트 api의 리턴타입 입니다. 이떄의 정상code는 0 입니다.

## apiConnection함수는 공통 api규칙으로 하였으나 단일api사용으로 인하여 일단 매개변수를 배제합니다.

## api호출 시 window.custom...함수를 이용하여 \_app에서 loading ui를 컨트롤 합니다.

## 별도의 404처리는 하지 않습니다.

## 과제문서에 표기 된 API사용 시 무조건4개의 보기가 표출되지는 않습니다.ex(true,false)
