import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native'

export default function Layout({children}) {
   

   return (
      <SafeAreaView style={styles.container}>
         <ScrollView>
           {children}
         </ScrollView>
      </SafeAreaView>
   )
}

const styles = StyleSheet.create({
   container:{
      flex: 1,
      backgroundColor: '#fff'
   }
})