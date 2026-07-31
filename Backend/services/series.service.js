
class SeriesService {

  async incrementarSerie(
    client, serie, comprobante
  ) {

    await client.query(
      `
      UPDATE series
      SET ultimo = ultimo + 1
      WHERE serie = $1 and comprobante=$2
      `,
      [serie, comprobante]
    );

  }

}

module.exports = new SeriesService();