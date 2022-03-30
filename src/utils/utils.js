import {
	Linking,
} from 'react-native';
import { firebase } from '../firebase/config';

export function esFormat(stringDate) {
	const splitDate = stringDate.split('-');

	if (splitDate.length > 3) {
		return `${splitDate[0]} de ${_getMonthInSpanish(splitDate[1])} de ${splitDate[2]} ${splitDate[3]}:${splitDate[4]}`;
	}
	return `${splitDate[0]} de ${_getMonthInSpanish(splitDate[1])} de ${splitDate[2]}`;
}

export async function openPDF(link) {
	try{
		const downloadUrl = await firebase.storage().refFromURL(link).getDownloadURL();

		Linking.canOpenURL(downloadUrl).then(supported => {
			if (supported) {
				Linking.openURL(downloadUrl);
			} else {
				console.log(`Don't know how to open URI: ${link}`);
			}
			});
		}
	catch(e){
		console.log(e);
	}
}

export function moneyFormat(number, decPlaces, decSep, thouSep) {
    decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
    decSep = typeof decSep === "undefined" ? "," : decSep;
    thouSep = typeof thouSep === "undefined" ? "." : thouSep;
    var sign = number < 0 ? "-" : "";
    var i = String(parseInt(number = Math.abs(Number(number) || 0).toFixed(decPlaces)));
    var j = (j = i.length) > 3 ? j % 3 : 0;

    return (sign +
        (j ? i.substr(0, j) + thouSep : "") +
        i.substr(j).replace(/(\decSep{3})(?=\decSep)/g, "$1" + thouSep) +
        (decPlaces ? decSep + Math.abs(number - i).toFixed(decPlaces).slice(2) : "")).trim();
}

export function emailIsValid (email) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

function _getMonthInSpanish(month) {
	const monthsMap = {
		'1': 'Enero',
		'2': 'Febrero',
		'3': 'Marzo',
		'4': 'Abril',
		'5': 'Mayo',
		'6': 'Junio',
		'7': 'Julio',
		'8': 'Agosto',
		'9': 'Septiembre',
		'10': 'Octubre',
		'11': 'Noviembre',
		'12': 'Diciembre'
	};

	return monthsMap[month];
}

export async function buyParticipations(project, amount) {
	try{
	const data = {
		org: project.orgId,
		draw: project.drawId,
		amount: amount
	};

	const instance = firebase.functions().httpsCallable('buyParticipations');

	try {
		const result = await instance(data);

		if (result.data.code == 200) {
			return {error: false};
		}
		else {
			switch (result.data.errorCode) {
				case 'BP001':
					return {error: true, message: 'Vaya, parece que este projecto solidario ha finalizado.'}
				case 'BP002':
					return {error: true, message: 'No quedan suficientes participaciones, por favor, elige otra cantidad.'}
				case 'BP003':
					return {error: true, message: 'Parece que no tienes fondos suficientes, por favor, recarga tu cartera.'}
				default:
					return {error: true, message: 'Algo ha ido mal, por favor, vuelve a intentarlo en unos minutos'}
			}
		}
	} catch (e) {
		return {error: true, message: 'Algo ha ido mal, por favor, vuelve a intentarlo en unos minutos'}
	}
	}
	catch (e) {
		return {error: true, message: 'Algo ha ido mal, por favor, vuelve a intentarlo en unos minutos'}
	}
};