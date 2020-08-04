import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

function TeacherItem() {
  return (
    <article className="teacher-item">
      <header>
        <img src="https://avatars3.githubusercontent.com/u/1205665?s=460&u=fccd302b77ea5ba0c1305adbaed1f2c5e863b1cf&v=4" alt="Macário Martins" />
        <div>
          <strong>Macário Martins</strong>
          <span>Química</span>
        </div>
      </header>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
        possimus ea veniam omnis, molestiae, eos ab quis, facilis quidem
        nesciunt consectetur molestias reiciendis ipsum cumque mollitia
        reprehenderit perferendis? Ipsum, laboriosam!
          </p>
      <footer>
        <p>
          Preço/hora
              <strong>R$ 80,00</strong>
        </p>
        <button role="button">
          <img src={whatsappIcon} alt="WhatsApp" />
              Entrar em contato
            </button>
      </footer>
    </article>
  );
}

export default TeacherItem;