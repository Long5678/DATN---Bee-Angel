
function MapEmbed() {
  return <>
      <iframe className='map'
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193858.12826668762!2d108.1629066376291!3d15.958376430333262!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31420dd4e14b2edb%3A0xbc6e1faf738be4c5!2zTmfFqSBIw6BuaCBTxqFu!5e0!3m2!1svi!2s!4v1725019499983!5m2!1svi!2s"
          width="400"
          height="300"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
  </>
}

export default MapEmbed
