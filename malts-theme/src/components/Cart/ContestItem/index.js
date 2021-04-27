import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import styles from './contest-item.module.scss';
import { useShopify } from '../../../contexts/ShopifyContext';

const ContestItem = ({ contest_item }) => {
  const contestHandle = 'GoTCompetition';
  const { t } = useTranslation();
  const { updateAttributes } = useShopify();

  const handleContestClick = (e) => {
    const entered = e.target.checked ? 'Yes' : 'No';
    updateAttributes(contestHandle, entered);
  };

  const hasEntered = !!contest_item.attributes?.some((e) => e.key === contestHandle && e.value === 'Yes');

  return (

    <Row className="pb-4">
      { contest_item.total >= 100
        && (
        <Col xs={12} className="text-left competitionSuccess">
          <p className={styles.contestMessage}>
            <strong>*Congratulations!</strong>
            <br />
            You've reached the qualified spend to be entered into the Game of Thrones promotion and
            be in with the chance of winning a Game Of Thrones Chest. To enter please agree to our
            {' '}
            <a href={`/${contest_item.locale}/terms-and-conditions-for-game-of-thrones-chest-promotion`} target="_blank" rel="noopener noreferrer">terms and conditions</a>
            <br />
            <br />
            <label htmlFor={contestHandle}>
              <input type="checkbox" id={contestHandle} name={contestHandle} onChange={handleContestClick} checked={hasEntered} />
              I agree, please enter me in the promotion.
            </label>
          </p>
          <p className={styles.contestDisclaimer}>{t('The Promotion is open to all residents of mainland United Kingdom (excluding Northern Ireland and Channel Islands) aged 18 or over.')}</p>
        </Col>
        )}
      { contest_item.total < 100
        && (
        <Col xs={12} className="text-left competitionFailure">
          <p className={styles.contestMessage}>
            *You're only
            {t('Currency')}
            { (100.00 - contest_item.total).toFixed(2) }
            {' '}
            away from being entered into our Game Of Thrones Promotion and be in with the chance of
            winning a Game Of Thrones Chest.
            Click
            {' '}
            <a href={`/${contest_item.locale}/terms-and-conditions-for-game-of-thrones-chest-promotion`}>here</a>
            {' '}
            to find out more.
          </p>
          <p className={styles.contestDisclaimer}>{t('The Promotion is open to all residents of mainland United Kingdom (excluding Northern Ireland and Channel Islands) aged 18 or over.')}</p>
        </Col>
        )}
    </Row>
  );
};

export default ContestItem;
