import styles from './MenuMobile.module.css';
import cn from 'classnames';
import { useState } from 'react';
import { ReactComponent as ArrowIcon } from './arrow.svg';
import { ReactComponent as ArrowBck } from './arrow-bck.svg';
import { ReactComponent as CloseIcon } from './close.svg';
import { IMenuItem } from './item.interface';

const menu: IMenuItem[] = [
    {
        name: 'Home',
        link: '/',
    },
    {
        name: 'About',
        children: [
            {
                name: 'Other Menu',
                children: [
                    {
                        name: 'OtherMenu2',
                        link: '/about/company',
                    },
                ],
            },
            {
                name: 'DreamTeam',
                link: '/about/command',
            },
            {
                name: 'Other',
                children: [
                    {
                        name: 'More menu',
                        link: '/about/company',
                    },
                ]
            },
        ],
    },
];

export const MenuMobile = (): JSX.Element => {
    const [isOpened, setIsOpened] = useState<boolean>(false);
    const [level, setLevel] = useState<number>(1);
    const [currentMenu, setCurrentMenu] = useState<IMenuItem[][]>([menu]);

    const selectLevel = (level: number, menu?: IMenuItem[]) => {
        if (!menu) {
            return;
        }
        setLevel(level);
        setCurrentMenu(l => {
            l[level] = menu;
            return l;
        });
    }

    const backLevel = () => {
        setLevel(level - 1);
        setCurrentMenu(l => {
            l[level] = [];
            return l;
        });
    }

    return (
        <>
            <button onClick={() => setIsOpened(true)}>Open Navbar</button>
            <nav className={styles.menu} role="navigation">
                <div
                    onClick={() => setIsOpened(false)}
                    className={cn(styles.cover, {
                        [styles.coverShow]: isOpened,
                    })}
                />
                <div
                    className={cn(styles.mobileMenuBox, {
                        [styles.mobileMenuBoxShow]: isOpened,
                    })}
                >
                    <div className={styles.menuHeader}>
                        {level > 1 && (
                            <button className={styles.backButton} onClick={() => backLevel()}>
                                <ArrowBck />
                                Back
                            </button>
                        )}
                        {level === 1 && <div className={styles.backButton}>MENU</div>}
                        <button className={styles.closeButton} onClick={() => setIsOpened(false)}>
                            <CloseIcon />
                        </button>
                    </div>
                    <div 
                        className={styles.level} 
                        style={{
                            transform: `translateX(calc(-100% * ${level - 1} - 24px * ${
                                level - 1
                            }))`,
                        }}
                    >
                        {currentMenu.map((item, i) => (
                            <div key={i}>
                                {item.map((m, index) => (
                                    <div key={m.name}>
                                        {m.children && (
                                        <button 
                                            className={styles.item} 
                                            onClick={() => selectLevel(level + 1, m.children)}
                                        >
                                            {m.name}<ArrowIcon />
                                        </button>
                                        )}
                                        {m.link && (
                                            <a className={styles.item} href={m.link}>
                                                {m.name}
                                            </a>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </nav>
        </>
    );
};