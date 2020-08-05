import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import warningIcon from '../../assets/images/icons/warning.svg';

import './styles.css';
import api from '../../services/api';

interface ScheduleItem {
  week_day: number,
  from: string,
  to: string
}

function TeacherForm() {
  const history = useHistory();
  const scheduleItemTemplate: ScheduleItem = {
    week_day: 0,
    from: '',
    to: ''
  };

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');

  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');

  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([scheduleItemTemplate]);

  function addNewScheduleItem() {
    setScheduleItems([
      ...scheduleItems,
      scheduleItemTemplate,
    ]);
  }

  function handleCreateClass(submitEvent: FormEvent) {
    submitEvent.preventDefault();

    api.post('classes', {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost: Number(cost),
      schedule: scheduleItems
    }).then(() => {
      alert('Cadastro realizado com sucesso!');
      history.push('/');
    }).catch(() => {
      alert('Erro no cadastro!');
    });

  }

  function setScheduleItemValue(position: number, field: string, value: string) {
    const newSchedule = scheduleItems.map((scheduleItem, index) => {
      if (index === position)
        return {
          ...scheduleItem,
          [field]: value
        }

      return scheduleItem;
    });

    setScheduleItems(newSchedule);
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrível que você quer ensinar."
        description="O primeiro passo é preencher esse formulário de inscrição"
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>
            <Input
              name="name"
              label="Nome completo"
              value={name}
              onChange={(changeEvent) => {
                setName(changeEvent.target.value)
              }}
            />

            <Input
              name="avatar"
              label="Avatar"
              value={avatar}
              onChange={(changeEvent) => {
                setAvatar(changeEvent.target.value)
              }}
            />

            <Input
              name="whatsapp"
              label="WhatsApp"
              value={whatsapp}
              onChange={(changeEvent) => {
                setWhatsapp(changeEvent.target.value)
              }}
            />

            <Textarea
              name="bio"
              label="Biografia"
              value={bio}
              onChange={(changeEvent) => {
                setBio(changeEvent.target.value)
              }}
            />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>

            <Select
              name="subject"
              label="Matéria"
              value={subject}
              onChange={(changeEvent) => {
                setSubject(changeEvent.target.value)
              }}
              options={[
                { value: 'Artes', label: 'Artes' },
                { value: 'Biologia', label: 'Biologia' },
                { value: 'Espanhol', label: 'Espanhol' },
                { value: 'Física', label: 'Física' },
                { value: 'Geografia', label: 'Geografia' },
                { value: 'História', label: 'História' },
                { value: 'Inglês', label: 'Inglês' },
                { value: 'Matemática', label: 'Matemática' },
                { value: 'Português', label: 'Português' },
                { value: 'Química', label: 'Química' },
              ]}
            />

            <Input
              name="cost"
              label="Custo da sua hora/aula"
              value={cost}
              onChange={(changeEvent) => {
                setCost(changeEvent.target.value)
              }}
            />
          </fieldset>

          <fieldset>
            <legend>
              Horários Disponíveis

              <button type="button" onClick={addNewScheduleItem}>
                + Novo horário
              </button>
            </legend>

            {
              scheduleItems.map((scheduleItem, index) => (
                <div key={`${scheduleItem.week_day}-${index}`} className="schedule-item">
                  <Select
                    name="week_day"
                    label="Dia da semana"
                    value={scheduleItem.week_day}
                    onChange={(changeEvent) => {
                      setScheduleItemValue(index, 'week_day', changeEvent.target.value);
                    }}
                    options={[
                      { value: '0', label: 'Domingo' },
                      { value: '1', label: 'Segunda-feira' },
                      { value: '2', label: 'Terça-feira' },
                      { value: '3', label: 'Quarta-feira' },
                      { value: '4', label: 'Quinta-feira' },
                      { value: '5', label: 'Sexta-feira' },
                      { value: '6', label: 'Sábado' },
                    ]}
                  />

                  <Input
                    name="from"
                    label="De"
                    type="time"
                    value={scheduleItem.from}
                    onChange={(changeEvent) => {
                      setScheduleItemValue(index, 'from', changeEvent.target.value);
                    }}
                  />

                  <Input
                    name="to"
                    label="Até"
                    type="time"
                    value={scheduleItem.to}
                    onChange={(changeEvent) => {
                      setScheduleItemValue(index, 'to', changeEvent.target.value);
                    }}
                  />
                </div>
              ))
            }

          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso Importante" />
            Importante! <br />
            Preencha todos os dados
          </p>

            <button type="submit">
              Salvar cadastro
          </button>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default TeacherForm;
