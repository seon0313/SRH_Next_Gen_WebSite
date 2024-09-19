import json
import time
from urllib.request import urlopen
class School:
    def calcDate(date: str):
        if '-' in date:
            if len(date) == 10:
                return date.replace('-','')
            else:
                date = date.split('-')
                if len(date[1]) < 2: date[1] = '0'+date[1]
                elif len(date[2]) < 2: date[2] = '0'+date[2]
                return ''.join(date)
        return date
    def getMeal(date: str, key: str) -> dict:
        date = School.calcDate(date)
        url = (f'https://open.neis.go.kr/hub/mealServiceDietInfo?ATPT_OFCDC_SC_CODE=B10'
               f'&Type=json'
               f'&KEY={key}'
               f'&SD_SCHUL_CODE=7010738'
               f'&MLSV_YMD={date}'
               f'&pIndex=1'
               f'&pSize=100')
        nodata = False
        data = urlopen(url).read()
        data = data.decode('utf8')
        data: dict = json.loads(data)
        if data.get('RESULT'): nodata = True
        result = {'result': False if nodata else True}
        if not nodata:
            data = data['mealServiceDietInfo'][1]['row']
            for index, i in enumerate(data):
                result[index] = {
                    'meal': i['DDISH_NM'].replace(' <br/>','\n').replace('<br/>','\n'),
                    'kcal': i['CAL_INFO'],
                    'ntr': i['NTR_INFO']
                }
        return result

    def getSchedule(grade,class_name: int,date:str, key: str):
        date = School.calcDate(date)
        url = (f'https://open.neis.go.kr/hub/hisTimetable?ATPT_OFCDC_SC_CODE=B10'
               f'&Type=json'
               f'&KEY={key}'
               f'&SD_SCHUL_CODE=7010738'
               f'&TI_FROM_YMD={date}'
               f'&TI_TO_YMD={date}'
               f'&CLASS_NM={class_name}'
               f'&GRADE={grade}'
               f'&pIndex=1'
               f'&pSize=100')
        nodata = False
        data = urlopen(url).read()
        data = data.decode('utf8')
        data: dict = json.loads(data)
        if data.get('RESULT'): nodata = True
        result = {'result': False if nodata else True}
        if not nodata:
            result['schedule'] = []
            data = data['hisTimetable'][1]['row']
            for i in data:
                result['schedule'].append({'time': i['PERIO'], 'name': i['ITRT_CNTNT']})
        return result

if __name__ == '__main__':
    a=School.getSchedule(2,1,'20240920')
    print(a)
    for i in a['schedule']:
        print(i['time'], i['name'])