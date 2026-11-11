"use client";

import { useState } from "react";
import { isNumberObject } from "util/types";

interface QuizQuestion {
  id: number;
  questionText: string;
  options: string[];
}

const QuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    questionText: "Какой тип ремонта вам необходим ?",
    options: ["Косметический", "Капитальный", "Дизайнерский"],
  },

  {
    id: 2,
    questionText: "Выберите площадь объекта",
    options: ["До 50 м²", "От 50 до 100 м²", "Более 100 м²"],
  },

  {
    id: 3,
    questionText: "Когда планируете начать ремонт ?",
    options: ["В ближайшее время", "В течение месяца", "Просто прицениваюсь"],
  },
];

export default function QuizSmartPage() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [contacts, setContacts] = useState({ name: "", phone: "" });

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleSelectOption = (answerText: string) => {
    setSelectedAnswers([...selectedAnswers, answerText]);
    setCurrentStep(currentStep + 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const finalLeadData = {
      answers: selectedAnswers,
      clientContacts: contacts,
      sentAt: Date.now(),
    };
    console.log("Финальный лид для отправки в CRM:", finalLeadData);
    alert("Спасибо! Расчет отправлен менеджеру.");
  };

  return (
    // Этот новый внешний div создает глубокий темный фон на весь экран и центрирует карточку
    <div className="min-h-screen w-full bg-slate-900 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 flex items-center justify-center p-4">
      {/* Наша основная карточка квиза (теперь она будет красиво парить по центру) */}
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl shadow-black/40 p-6 md:p-8 space-y-6 border border-white/10">
        <h1 className="text-2xl font-bold text-gray-900 border-b border-gray-100 pb-4 text-center">
          Калькулятор стоимости ремонта
        </h1>

        {currentStep < QuizQuestions.length ? (
          <>
            {/* Контейнер прогресс-бара */}
            <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden mb-6">
              <div
                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full transition-all duration-500 ease-out"
                style={{
                  width: `${((currentStep + 1) / QuizQuestions.length) * 100}%`,
                }}
              />
            </div>

            <p className="text-xl font-semibold text-gray-800 leading-snug">
              {QuizQuestions[currentStep].questionText}
            </p>

            <div className="grid grid-cols-1 gap-3 pt-2">
              {QuizQuestions[currentStep].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectOption(option)}
                  className="w-full text-left p-4 border border-gray-200 rounded-xl hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 hover:border-blue-400 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 text-gray-700 font-medium active:scale-[0.99]"
                >
                  {option}
                </button>
              ))}
            </div>

            {currentStep < QuizQuestions.length - 1 && (
              <button
                onClick={handleNextStep}
                className="mt-4 px-5 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/20 active:scale-[0.98] transition-all"
              >
                Далее
              </button>
            )}
          </>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 text-left"
          >
            <div className="text-center pb-2 space-y-2">
              <h2 className="text-2xl font-extrabold text-emerald-600">
                🎉 Расчет готов!
              </h2>
              <p className="text-gray-500 font-medium text-sm">
                Мы сохранили ваши ответы. Оставьте контакты, чтобы получить
                точную смету.
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Ваше имя
              </label>
              <input
                type="text"
                value={contacts.name}
                onChange={(e) =>
                  setContacts({ ...contacts, name: e.target.value })
                }
                className="w-full p-3.5 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-gray-900 placeholder-gray-400 bg-gray-50/50 transition-all font-medium"
                placeholder="Иван"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Телефон для связи
              </label>
              <input
                type="tel"
                value={contacts.phone}
                onChange={(e) =>
                  setContacts({ ...contacts, phone: e.target.value })
                }
                className="w-full p-3.5 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-gray-900 placeholder-gray-400 bg-gray-50/50 transition-all font-medium"
                placeholder="+7 (999) 999-99-99"
                required
              />
            </div>

            <button
              type="submit"
              className="mt-4 w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl hover:from-green-600 hover:to-emerald-700 hover:shadow-xl hover:shadow-green-500/20 active:scale-[0.99] transition-all duration-300 tracking-wide text-base shadow-lg"
            >
              Получить расчет стоимости
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
