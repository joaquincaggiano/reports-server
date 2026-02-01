import type { StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces';

const styles: StyleDictionary = {
  header: {
    fontSize: 22,
    bold: true,
    alignment: 'center',
    margin: [0, 0, 0, 20],
  },
  body: {
    alignment: 'justify',
    margin: [0, 0, 0, 70],
  },
  signature: {
    fontSize: 14,
    bold: true,
  },
};

export const getEmploymentLetterReport = (): TDocumentDefinitions => {
  const docDefinition: TDocumentDefinitions = {
    styles,
    content: [
      {
        text: 'CONSTANCIA DE EMPLEO',
        style: 'header',
      },
      {
        text: `Yo, [Nombre del Empleador], en mi calidad de [Cargo del Empleador] de [Nombre de la Empresa], por medio de la presente certifico que [Nombre del Empleado] ha sido empleado en nuestra empresa desde el [Fecha de Inicio del Empleado]. \n\n Durante su empleo, el Sr./Sra. [Nombre del Empleado] ha desempeñado el cargo de [Cargo del Empleado], demostrando responsabilidad, compromiso y habilidades profesionales en sus labores. \n\n La jornada laboral del Sr./ Sra. [Nombre del Empleado] es de [Número de Horas] horas semanales, con un horario de [Horario de Trabajo], cumpliendo con las políticas y procedimientos establecidos por la empresa. \n\n Esta constancia se expide a solicitud del interesado para los fines que considere conveniente.`,
        style: 'body',
      },
      {
        text: `Atentamente,\n [Nombre del Empleador]\n [Cargo del Empleador]\n [Nombre de la Empresa]\n [Fecha de Emisión]`,
        style: 'signature',
      },
    ],
  };

  return docDefinition;
};
