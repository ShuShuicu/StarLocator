import { DefaultButtonFonctioner } from './default.js';
import { AstroCalculator } from '../../core/AstroCoord/calc.js';


// 选择天体按钮功能类
class CeleCoord extends DefaultButtonFonctioner{
    constructor(interactPhoto){
        super(interactPhoto);
        this.astroCalculator = new AstroCalculator();
    }

    onClick() {
        super.onClick();
        
        let starNames = this.getStarNames();
        let date = this.interactPhoto.getDateTime();

        this.astroCalculator.getHaDecbyNames(starNames, date).then(results => {
            let starNames = this.getStarNames();
            for (let i = 0; i < starNames.length; i++) {
                let [ha, dec] = results.get(starNames[i]);
                if (isNaN(ha) || isNaN(dec)) {
                    this.interactPhoto.tips.innerHTML = `无法自动计算${starNames[i]}的赤道坐标`;
                } else {
                    this.setHADE(i+1, ha, dec);
                    this.interactPhoto.tips.innerHTML = `自动计算天体坐标成功`;
                }
            }
        });
    }

    getStarNames() {
        let starNames = [];
        for(let i = 1; i <= this.interactPhoto.numOfPts; i++){
            starNames.push(document.getElementById(`name${i}`).textContent);
        }
        return starNames;
    }

    setHADE(id, hourAngle, declination) {
        let sign = (hourAngle < 0 ? '-' : '');
        hourAngle = Math.abs(hourAngle);
        document.getElementById(`hAngleH${id}`).textContent = sign + parseInt(hourAngle);
        hourAngle = (hourAngle - parseInt(hourAngle)) * 60;
        document.getElementById(`hAngleM${id}`).textContent = parseInt(hourAngle);
        hourAngle = (hourAngle - parseInt(hourAngle)) * 60;
        document.getElementById(`hAngleS${id}`).textContent = hourAngle;

        sign = (declination < 0 ? '-' : '');
        declination = Math.abs(declination);
        document.getElementById(`declinD${id}`).textContent = sign + parseInt(declination);
        declination = (declination - parseInt(declination)) * 60;
        document.getElementById(`declinM${id}`).textContent = parseInt(declination);
        declination = (declination - parseInt(declination)) * 60;
        document.getElementById(`declinS${id}`).textContent = declination;
    }
}


export { CeleCoord };