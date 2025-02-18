import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, useWindowDimensions } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { hitSlop } from '../../constants'
import { useConfiguration } from '../../contexts/configuration'
import { useTheme } from '../../contexts/theme'
import { GenericFn } from '../../types/fn'
import { testIdWithKey } from '../../utils/testable'
// eslint-disable-next-line import/no-named-as-default
import Button, { ButtonType } from '../buttons/Button'

const iconSize = 30

export enum InfoBoxType {
  Info,
  Success,
  Warn,
  Error,
}

interface BifoldErrorProps {
  notificationType: InfoBoxType
  title: string
  description?: string
  bodyContent?: Element
  message?: string
  secondaryCallToActionTitle?: string
  secondaryCallToActionPressed?: GenericFn
  onCallToActionPressed?: GenericFn
  onCallToActionLabel?: string
  onClosePressed?: GenericFn
}

const InfoBox: React.FC<BifoldErrorProps> = ({
  notificationType,
  title,
  description,
  bodyContent,
  message,
  secondaryCallToActionTitle,
  secondaryCallToActionPressed,
  onCallToActionPressed,
  onCallToActionLabel,
  onClosePressed,
}) => {
  const { width } = useWindowDimensions()
  const { t } = useTranslation()
  const { TextTheme, ColorPallet } = useTheme()
  const [showDetails, setShowDetails] = useState<boolean>(false)
  const { showDetailsInfo } = useConfiguration()
  const styles = StyleSheet.create({
    container: {
      // backgroundColor: ColorPallet.brand.modalPrimaryBackground,
      backgroundColor:'#F0F5FF',
      // borderColor: ColorPallet.notification.infoBorder,
      borderColor:'blue',
      borderRadius: 20,
      borderWidth: 1,
      padding: 10,
      minWidth: width - 2 * 25,
    },
    headerContainer: {
      flexDirection: 'row',
      paddingHorizontal: 5,
      paddingTop: 5,
    },
    bodyContainer: {
      flexDirection: 'column',
      marginLeft: 10 + iconSize,
      paddingHorizontal: 5,
      paddingBottom: 5,
      flexGrow: 0,
    },
    headerText: {
      ...TextTheme.bold,
      marginLeft: 7,
      flexShrink: 1,
      alignSelf: 'center',
      color: ColorPallet.notification.infoText,
    },
    bodyText: {
      // ...TextTheme.normal,
      flexShrink: 1,
      marginVertical: 16,
      // color: ColorPallet.notification.infoText,
      color:'red'
    },
    icon: {
      marginRight: 10,
      alignSelf: 'center',
    },
    showDetailsText: {
      ...TextTheme.title,
      fontWeight: TextTheme.normal.fontWeight,
      color: ColorPallet.brand.link,
    },
  })
  let iconName = 'info'
  let iconColor = ColorPallet.notification.infoIcon

  switch (notificationType) {
    case InfoBoxType.Info:
      iconName = 'info'
      iconColor = ColorPallet.notification.infoIcon
      styles.container = {
        ...styles.container,
        // backgroundColor: ColorPallet.notification.info,
        // borderColor: ColorPallet.notification.infoBorder,
        backgroundColor:'#F0F5FF',
        borderColor:'red'
      }
      styles.headerText = {
        ...styles.headerText,
        color: ColorPallet.notification.infoText,
      }
      styles.bodyText = {
        ...styles.bodyText,
        color: ColorPallet.notification.infoText,
      }
      break

    case InfoBoxType.Success:
      iconName = 'check-circle'
      iconColor = ColorPallet.notification.successIcon
      styles.container = {
        ...styles.container,
        // backgroundColor: ColorPallet.notification.success,
        // borderColor: ColorPallet.notification.successBorder,
        backgroundColor:'#F0F5FF',
        borderColor:'red'
      }
      styles.headerText = {
        ...styles.headerText,
        color: ColorPallet.notification.successText,
      }
      styles.bodyText = {
        ...styles.bodyText,
        color: ColorPallet.notification.successText,
      }
      break

    case InfoBoxType.Warn:
      iconName = 'warning'
      iconColor = ColorPallet.notification.warnIcon
      styles.container = {
        ...styles.container,
        // backgroundColor: ColorPallet.notification.warn,
        // borderColor: ColorPallet.notification.warnBorder,
        backgroundColor:'#F0F5FF',
        borderColor:'red'
      }
      styles.headerText = {
        ...styles.headerText,
        color: ColorPallet.notification.warnText,
      }
      styles.bodyText = {
        ...styles.bodyText,
        color: ColorPallet.notification.warnText,
      }
      break

    case InfoBoxType.Error:
      iconName = 'error'
      iconColor = ColorPallet.notification.errorIcon
      styles.container = {
        ...styles.container,
        // backgroundColor: ColorPallet.notification.error,
        // borderColor: ColorPallet.notification.errorBorder,
        backgroundColor:'#F0F5FF',
        borderColor:'red'
      }
      styles.headerText = {
        ...styles.headerText,
        color: ColorPallet.notification.errorText,
      }
      styles.bodyText = {
        ...styles.bodyText,
        color: ColorPallet.notification.errorText,
      }
      break

    default:
      throw new Error('InfoTextBoxType needs to be set correctly')
  }

  const onShowDetailsTouched = () => {
    setShowDetails(true)
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={[styles.icon, { flexDirection: 'row' }]}>
          <Icon accessible={false} name={iconName} size={iconSize} color={iconColor} />
          <Text style={styles.headerText} testID={testIdWithKey('HeaderText')}>
            {title}
          </Text>
        </View>
        {onClosePressed && (
          <View>
            <TouchableOpacity
              accessibilityLabel={t('Global.Dismiss')}
              accessibilityRole={'button'}
              testID={testIdWithKey(`Dismiss${notificationType}`)}
              onPress={onClosePressed}
              hitSlop={hitSlop}
            >
              <Icon name={'close'} size={iconSize} color={ColorPallet.notification.infoIcon} />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <ScrollView style={styles.bodyContainer}>
        <>
          {!showDetails ? bodyContent : null}
          {(description || (message && showDetails)) && (
            <Text style={styles.bodyText} testID={testIdWithKey('BodyText')}>
              {showDetails ? message : description}
            </Text>
          )}
          {message && !showDetails && (showDetailsInfo ?? true) && (
            <TouchableOpacity
              accessibilityLabel={t('Global.ShowDetails')}
              testID={testIdWithKey('ShowDetails')}
              style={{ marginVertical: 14 }}
              onPress={onShowDetailsTouched}
              hitSlop={hitSlop}
            >
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.showDetailsText}>{t('Global.ShowDetails')} </Text>
                <Icon name="chevron-right" size={iconSize} color={ColorPallet.brand.link} />
              </View>
            </TouchableOpacity>
          )}
          {onCallToActionPressed && (
            <View style={{ paddingTop: 10 }}>
              <Button
                title={onCallToActionLabel || t('Global.Okay')}
                accessibilityLabel={onCallToActionLabel || t('Global.Okay')}
                testID={onCallToActionLabel ? testIdWithKey(onCallToActionLabel) : testIdWithKey('Okay')}
                buttonType={ButtonType.Primary}
                onPress={onCallToActionPressed}
              />
            </View>
          )}
          {secondaryCallToActionTitle && secondaryCallToActionPressed && (
            <View style={{ paddingTop: 10 }}>
              <Button
                title={secondaryCallToActionTitle}
                accessibilityLabel={secondaryCallToActionTitle}
                testID={testIdWithKey(secondaryCallToActionTitle)}
                buttonType={ButtonType.Secondary}
                onPress={secondaryCallToActionPressed}
              />
            </View>
          )}
        </>
      </ScrollView>
    </View>
  )
}

export default InfoBox
