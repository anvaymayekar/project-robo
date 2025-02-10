import React from 'react';
import {StyleSheet, View} from 'react-native';
import {colors} from '../theme';
import {Label} from '../components';

interface SectionType {
  name?: string;
  roll?: string;
}
const Section = ({name, roll}: SectionType): React.JSX.Element => {
  const textSize = 20;
  return (
    <View style={{...styles.detailsHead, ...styles.sectionContent}}>
      <Label
        weight="SemiBold"
        size={textSize}
        lineHeight={28}
        color={colors.three}>
        {name}
      </Label>

      <Label weight="Medium" size={textSize}>
        {roll}
      </Label>
    </View>
  );
};

const Details = (): React.JSX.Element => {
  return (
    <View style={styles.detailsCover}>
      <View style={styles.detailsHead}>
        <Label weight="SemiBold" lineHeight={28} color={colors.three}>
          FY ECS1
        </Label>

        <Label weight="Medium" size={18}>
          Group - VI
        </Label>
      </View>

      <Section name="Anvay Mayekar" roll="28" />
   
    </View>
  );
};

const styles = StyleSheet.create({
  detailsCover: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  detailsHead: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '10%',
  },
  sectionContent: {
    flexDirection: 'row',
    paddingHorizontal: '10%',
    justifyContent: 'space-between',
  },
});

export default Details;
