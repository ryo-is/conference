import { FC } from 'root/react-app-env'
import { Fragment } from 'react'
import i18next from 'i18next'
import timetableStyles from '../static/Schedule.module.scss'
import { sessions, trackNames, tracks } from '../contents/sessions'
import { formatTime } from '@utils/dateTime'
import { InfoPopover } from './modules/InfoPopover'
import { capitalizeFirstCharacter } from '@utils/text'

const TimetableSection: FC = () => {
  return (
    <section id={'timetable'} className="w-10/12 ml-auto mr-auto pt-2">
      <h2>{i18next.t('timetable')}</h2>
      <div className={timetableStyles.schedule} aria-labelledby={'schedule-heading'}>
        <Fragment>
          {tracks.map((track: string, val: number) => {
            return (
              <span
                key={val}
                className={timetableStyles.trackslot}
                aria-hidden={'true'}
                style={{ gridColumn: track, gridRow: 'tracks' }}
              >
                {trackNames[val]}
              </span>
            )
          })}
        </Fragment>

        <Fragment>
          {sessions.map((session, index) => {
            return (
              <Fragment key={index}>
                <h2
                  className={timetableStyles.timeslot}
                  aria-hidden={'true'}
                  style={{ gridRow: `time-${session.startTime}` }}
                >
                  {formatTime(session.startTime)}
                </h2>
                <Fragment>
                  {session.tracks.map((track, key) => {
                    return (
                      <Fragment key={key}>
                        {track.isEmpty && track.isRest && (
                          <div
                            className={`${timetableStyles.session} ${timetableStyles.rest}`}
                            aria-hidden={'true'}
                            style={{
                              gridColumn: track.trackId,
                              gridRow: `time-${session.startTime} time-${session.endTime}`,
                            }}
                          >
                            {i18next.t('rest_ask_the_speaker')}
                          </div>
                        )}
                        {!track.isEmpty &&
                          !track.isRest &&
                          !track.hasOwnProperty('presenterName') && <div />}
                        {!track.isEmpty && !track.isRest && track.hasOwnProperty('presenterName') && (
                          <div
                            className={`${timetableStyles.session} ${timetableStyles.track1}`}
                            style={{
                              gridColumn: track.trackId,
                              gridRow: `time-${session.startTime} time-${session.endTime}`,
                            }}
                          >
                            <InfoPopover track={track} />
                            <h3 className={timetableStyles.sessionTitle}>
                              <div>
                                <p>{track.presenterTitle}</p>
                              </div>
                            </h3>
                            <h4 className={timetableStyles.sessionTime}>
                              {`${formatTime(session.startTime)} - ${formatTime(session.endTime)}`}
                            </h4>
                            <p className={timetableStyles.sessionPresenter}>
                              {capitalizeFirstCharacter(track.personType)}
                              {track.presenterLevel && ` / ${i18next.t(track.presenterLevel)}`}
                            </p>
                          </div>
                        )}
                      </Fragment>
                    )
                  })}
                </Fragment>
              </Fragment>
            )
          })}
        </Fragment>
      </div>
    </section>
  )
}

export default TimetableSection
