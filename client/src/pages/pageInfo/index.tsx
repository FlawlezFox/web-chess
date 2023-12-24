import { Link, useLocation } from "react-router-dom";
import IconChessBoard from "../../assets/svg/icon-chess-board.svg?react";
import Contents from "../../common/components/ui/Contents";
import imageLogin from "../../assets/images/image-login.png";
import imageCreateGame from "../../assets/images/image-create-game.png";
import imageJoinRoom from "../../assets/images/image-join-room.png";
import imageGameRoom from "../../assets/images/image-game-room.png";
import imageBoard from "../../assets/images/image-board.png";
import imageGameHistory from "../../assets/images/image-game-history.png";
import imageGiveupConfirm from "../../assets/images/image-giveup-confirm.png";
import imageGiveupWin from "../../assets/images/image-giveup-win.png";
import imageDrawWait from "../../assets/images/image-draw-wait.png";
import imageDrawConfirm from "../../assets/images/image-draw-confirm.png";
import imageDraw from "../../assets/images/image-draw.png";
import imageExitConfirm from "../../assets/images/image-exit-confirm.png";

// styles
import styles from "./index.module.css";
import { useEffect, useRef } from "react";

const PageInfo = () => {
    return (
        <div className={styles.pageWrapper}>
            <ScrollToAnchor />
            <Link className={styles.gameTitle} to="/">
                <IconChessBoard className={styles.iconChessBoard} />
                <h1 className={styles.header}>Шахматный гений</h1>
            </Link>

            <div className={styles.title}>Справочная информация</div>

            <div className={styles.content}>
                <div className={styles.textContainer}>
                    <div className={styles.section}>
                        <div id="intro" className={styles.sectionHeader}>Введение</div>

                        <div className={styles.paragraphContainer}>
                            <div className={styles.paragraph}>
                                Приложение «Игра «Шахматы» - это веб-игра, позволяющая играть в шахматы онлайн против других игроков.
                            </div>

                            <div className={styles.paragraph}>
                                Данное приложение использует базу данных реального времени Firebase. Игра совместима с большинством современных браузеров. Системные требования: 2гб оперативной памяти, 100гб жесткого диска.
                            </div>
                        </div>
                    </div>

                    <div className={styles.section}>
                        <div id="connect-to-game" className={styles.sectionHeader}>Подключение к игре</div>

                        <div className={styles.subsection}>
                            <div id="authorisation" className={styles.subsectionHeader}>Авторизация</div>

                            <div className={styles.paragraphContainer}>
                                <div className={styles.paragraph}>
                                    Для того, чтобы получить доступ к игре нужно ввести логин. Логин считается допустимым, если он написан латиницей, длиной от 4 до 16 букв, может включать в себя символы “-” и “_”.
                                </div>

                                <img src={imageLogin} alt="" className={styles.image} />

                                <div className={styles.paragraph}>
                                    Логин введен верно, если нет сообщения об ошибке.
                                </div>

                                <div className={styles.paragraph}>
                                    После нажатия на одну из кнопок “Начать игру” или “Войти в комнату” игрок будет авторизован в системе, а его логин и уникальный идентификатор будет зенесен в базу данных.
                                </div>
                            </div>
                        </div>

                        <div className={styles.subsection}>
                            <div id="creating-room" className={styles.subsectionHeader}>Создание комнаты</div>

                            <div className={styles.paragraphContainer}>
                                <div className={styles.paragraph}>
                                    Для того чтобы создать игровую комнату, необходимо нажать кнопку “Начать игру”, после верно введенного логина.
                                </div>

                                <div className={styles.paragraph}>
                                    Откроется модальное окно, в котором будет сгенерирован уникальный идентификатор комнаты. Система будет находится в режиме ожидания подключения второго игрока.
                                </div>

                                <img src={imageCreateGame} alt="" className={styles.image} />

                                <div className={styles.paragraph}>
                                    Пользователь может скопировать данный идентификатор нажатием кнопки “Скопировать код” и передать его оппоненту, чтобы он смог войти в комнату.
                                </div>

                                <div className={styles.paragraph}>
                                    Если пользователь решил не дожидаться оппонента или сменить логин, он может закрыть это окно нажатием кнопки в виде крестика.
                                </div>
                            </div>
                        </div>

                        <div className={styles.subsection}>
                            <div id="join-room" className={styles.subsectionHeader}>Вход в комнату</div>

                            <div className={styles.paragraphContainer}>
                                <div className={styles.paragraph}>
                                    Для присоединения к комнате пользователю необходимо выбрать кнопку “Войти в комнату”, получить код игровой комнаты от первого игрока и ввести его в поле.
                                </div>

                                <img src={imageJoinRoom} alt="" className={styles.image} />

                                <div className={styles.paragraph}>
                                    Если код введен неверно, то после нажатия на кнопку “Войти в игру” под полем выведется сообщение пользователю. Также, если код верен и в комнате уже находится 2 игрока, пользователю выведется сообщение об ошибке.
                                </div>

                                <div className={styles.paragraph}>
                                    Если код корректный, после нажатия кнопки пользователь окажется на странице игры.
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.section}>
                        <div id="game-process" className={styles.sectionHeader}>Игровой процесс</div>

                        <div className={styles.paragraphContainer}>
                            <div className={styles.paragraph}>
                                Как только оба пользователя подключатся к комнате, начнется игровая сессия.
                            </div>

                            <div className={styles.paragraph}>
                                На каждый ход уделяется 1 минута. Игра длится до тех пор, пока один из игроков не выиграет партию или заранее не завершит игру (кнопками “Сдаться” или “Ничья”).
                            </div>

                            <img src={imageGameRoom} alt="" className={styles.image} />

                            <div className={styles.paragraph}>
                                Чтобы выполнить ход, необходимо выбрать фигуру нажатием на нее и выбрать одно из подсвеченных полей, на которые можно сходить.
                            </div>

                            <img src={imageBoard} alt="" className={styles.image} />
                        </div>

                        <div className={styles.subsection}>
                            <div id="game-history" className={styles.subsectionHeader}>История ходов</div>

                            <div className={styles.paragraphContainer}>
                                <div className={styles.paragraph}>
                                    Справа от шахматной доски расположена панель, в которой записывается
                                    история ходов обоих игроков.
                                </div>

                                <img src={imageGameHistory} alt="" className={styles.image} />

                                <div className={styles.paragraph}>
                                    В нее записывается: номер хода, координаты, какая фигура была съедена и цвет игрока, который выполнил этот ход.
                                </div>

                                <div className={styles.paragraph}>
                                    Эти записи можно сохранить в виде .log файла, по нажатию на кнопку скачать.
                                </div>

                                <div className={styles.paragraph}>
                                    Также снизу есть две кнопки “Сдаться” и “Ничья”.
                                </div>
                            </div>
                        </div>

                        <div className={styles.subsection}>
                            <div id="give-up" className={styles.subsectionHeader}>Сдаться</div>

                            <div className={styles.paragraphContainer}>
                                <div className={styles.paragraph}>
                                    При нажатии на кнопку “Сдаться” всплывет модальное окно с подтверждением решения сдаться.
                                </div>

                                <img src={imageGiveupConfirm} alt="" className={styles.image} />

                                <div className={styles.paragraph}>
                                    Если нажать “Нет” модальное окно закроется и игра продолжится, если нажать “Да” то игра завершится победой противоположного игрока, и на экран выведется соответствующее сообщение.
                                </div>

                                <img src={imageGiveupWin} alt="" className={styles.image} />

                                <div className={styles.paragraph}>
                                    По окончании таймера обоих игроков перенаправит на главный экран.По окончании таймера обоих игроков перенаправит на главный экран.
                                </div>
                            </div>
                        </div>

                        <div className={styles.subsection}>
                            <div id="draw" className={styles.subsectionHeader}>Ничья</div>

                            <div className={styles.paragraphContainer}>
                                <div className={styles.paragraph}>
                                    При нажатии на кнопку “Ничья” у игрока, который предлагает ничью, всплывет сообщение с ожиданием ответа от второго игрока.
                                </div>

                                <img src={imageDrawWait} alt="" className={styles.image} />

                                <div className={styles.paragraph}>
                                    У второго игрока всплывет окно, в котором он может подтвердить ничью нажатием кнопки “Да”, либо продолжить игру нажатием кнопки “Нет”.
                                </div>

                                <img src={imageDrawConfirm} alt="" className={styles.image} />

                                <div className={styles.paragraph}>
                                    Если игрок примет предложение ничьи, то у обоих игроков выведется сообщение о том, что игра окончилась ничьей.
                                </div>

                                <img src={imageDraw} alt="" className={styles.image} />
                            </div>
                        </div>

                        <div className={styles.subsection}>
                            <div id="exit-from-game" className={styles.subsectionHeader}>Выход из игры</div>

                            <div className={styles.paragraphContainer}>
                                <div className={styles.paragraph}>
                                    Если игрок попробует выйти из игры путем закрытия окна браузера или нажав кнопку назад в браузере, то сначала у него высветится окно для подтверждения выхода.
                                </div>

                                <img src={imageExitConfirm} alt="" className={styles.image} />

                                <div className={styles.paragraph}>
                                    После нажатия кнопки “Да”, второму игроку будет присвоена победа.
                                </div>
                            </div>
                        </div>

                        <div className={styles.subsection}>
                            <div id="end-of-timer" className={styles.subsectionHeader}>Окончание таймера</div>

                            <div className={styles.paragraphContainer}>
                                <div className={styles.paragraph}>
                                    Как только таймер истекает у текущего игрока, который должен был совершить ход, он проигрывает, а противоположный игрок  выигрывает. Игрокам выводится сообщение о том, какой игрок победил.
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.section}>
                        <div id="exit" className={styles.sectionHeader}>Выход из программы</div>

                        <div className={styles.paragraphContainer}>
                            <div className={styles.paragraph}>
                                Для того, чтобы выйти из программы, необходимо либо полностью закрыть браузер, либо закрыть окно браузера с игрой.
                            </div>

                            <div className={styles.paragraph}>
                                Если вы вышли из программы во время ожидания комнаты, то комната будет удалена, а второй игрок не сможет к ней подключиться.
                            </div>

                            <div className={styles.paragraph}>
                                Если вы вышли из программы во время игровой сессии, то второму игроку будет засчитана победа.
                            </div>
                        </div>
                    </div>
                </div>

                <Contents />
            </div>
        </div>
    );
}

function ScrollToAnchor() {
    const location = useLocation();
    const lastHash = useRef('');
  
    // listen to location change using useEffect with location as dependency
    // https://jasonwatmore.com/react-router-v6-listen-to-location-route-change-without-history-listen
    useEffect(() => {
      if (location.hash) {
        lastHash.current = location.hash.slice(1); // safe hash for further use after navigation
      }
  
      if (lastHash.current && document.getElementById(lastHash.current)) {
        setTimeout(() => {
          document
            .getElementById(lastHash.current)
            ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          lastHash.current = '';
        }, 100);
      }
    }, [location]);
  
    return null;
}

export default PageInfo;