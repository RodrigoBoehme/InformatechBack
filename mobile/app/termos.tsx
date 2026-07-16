import { useState } from 'react'
import { Alert, Pressable, Text, View, useWindowDimensions } from 'react-native'
import { Link, router } from 'expo-router'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { useAuth } from '@/contexts/AuthContext'
import { colors } from '@/constants/theme'
import { StyleSheet } from 'react-native'


export default function termos(){
  const {width,height}=useWindowDimensions()

    return(
        <View style={[{ flex: 1, padding: 24, justifyContent: 'center', gap: 14, backgroundColor: colors.background ,  },{width:width,height:height}]}>
            <View style={[styles.glowTop, { top: -height * 0.4, right: -width * 0.8, width: width * 1.4, height: width * 1.3, borderRadius: (width * 1) / 2 }]} />
            <View style={[styles.glowBottom, { bottom: -height * 0.4, left: -width * 0.8, width: width * 1.4, height: width * 1.2, borderRadius: (width * 1) / 2 }]} />
            <View style={[styles.glowBottom, { top: -height * 0.4, left: -width * 0.9, width: width * 1.44, height: width * 1.1, borderRadius: (width * 1) / 2 }]} />

            <Text style={{}}>Termos de uso</Text>
            <Text style={{}}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero sunt expedita asperiores officiis ipsam vero eius qui quaerat temporibus! Porro ullam odio quos, non voluptates quasi, adipisci earum inventore provident ab perspiciatis esse voluptas repellendus temporibus velit quaerat. Eaque debitis animi sequi magnam numquam repellat voluptate culpa eveniet, ea ducimus sed sunt ad alias, reiciendis molestias aut ut consequatur natus velit, dolorem architecto ipsam. Aliquam dolorum vel quis est tempore deleniti? Quidem animi nobis minima consequatur neque fugiat reiciendis. Veritatis provident, beatae repellat error modi quas earum dolor quis corporis qui consequuntur, ipsam amet dolore tempora aperiam praesentium fuga eius ea laborum illum hic laboriosam aliquid. Praesentium dolorem voluptas deleniti asperiores alias consequuntur officia unde sapiente, dicta aspernatur ad dolorum distinctio magni, ipsam doloribus nostrum architecto error impedit voluptatum. Eveniet voluptates ducimus tenetur, vel esse quisquam earum ut sed fugit voluptatibus saepe distinctio eligendi, autem omnis nam eos reprehenderit voluptas nostrum labore consequatur? Recusandae aperiam magnam fugit, consectetur blanditiis, possimus commodi suscipit eaque quam laudantium aspernatur, error eligendi obcaecati impedit praesentium ullam! Similique totam voluptates doloremque impedit minima voluptatem suscipit quo temporibus architecto deserunt rerum exercitationem at non perferendis error porro numquam dicta molestiae sit, mollitia aspernatur quibusdam ipsam nemo. Ad exercitationem similique facere eveniet voluptatem distinctio ipsa voluptates debitis! Odio voluptate omnis, quis consequuntur nulla assumenda distinctio dolorem illo enim nobis eius eos beatae quos, exercitationem explicabo excepturi iure doloremque minima eum ipsa animi voluptates aperiam? Nulla fugit voluptates ab laboriosam soluta fuga veritatis adipisci in, quas sed nihil saepe, consequuntur ex veniam ullam quod harum sapiente qui illum voluptatum. Itaque, dolor delectus eaque in earum laboriosam qui quibusdam! Quis odio autem laudantium asperiores impedit dolore dicta nesciunt iusto expedita dolores nisi, sint corporis recusandae suscipit facere distinctio fugiat fugit a. Quod nisi possimus nihil perferendis doloremque recusandae dignissimos voluptatem qui velit pariatur praesentium consectetur error officia, libero iure totam dolorem ab eos omnis architecto fugiat ut facilis beatae? Placeat dolore iusto eos voluptate ea tempora error nam ad. Officia repudiandae est animi molestiae maiores aspernatur! Dolores eius praesentium ipsum ex tenetur vitae, error est enim eos corporis officiis nobis neque vero maxime quaerat quisquam esse repellendus saepe quidem dolore dolorum voluptatibus debitis consequatur necessitatibus. Aliquid sit minus eius ea iusto neque qui dolores dolore vel omnis incidunt est, delectus asperiores commodi accusantium excepturi ipsam alias obcaecati mollitia porro cupiditate, ducimus provident inventore unde! Aut inventore at nam error quidem. Voluptate magnam ipsum possimus quasi eveniet sunt laboriosam molestiae rem consequatur, impedit maxime voluptatum animi doloribus, magni iste enim quos inventore exercitationem nobis. Ut mollitia quaerat illo eos dolorum quam quae aut distinctio, cupiditate aspernatur iusto velit praesentium nesciunt labore dicta quisquam autem? Autem quia mollitia a ullam debitis, quae placeat omnis distinctio incidunt quisquam delectus architecto dolorem id repudiandae ipsa deserunt asperiores harum cupiditate consequuntur ex vero, eos eligendi officiis. Voluptates qui numquam sapiente veniam adipisci fugiat quos accusantium, obcaecati eum? Mollitia recusandae iure eius repellendus! Saepe aperiam ab debitis officia. Asperiores quis et suscipit, doloribus vitae illo?</Text>


            <Pressable onPress={()=>{router.back()}} style={{} }>
                <Text>Voltar</Text>
            </Pressable>


        </View>
    )
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#030712", 
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24, // Ajustado conforme base da sugestão
    paddingVertical: 20,
  },
  glowTop: {
    position: "absolute",
    backgroundColor: "rgba(132, 204, 22, 0.12)", 
  },
  glowBottom: {
    position: "absolute",
    backgroundColor: "rgba(30, 41, 59, 0.5)", 
  },
  mainContent: {
    flex: 1,
    width: "100%",
    maxWidth: 500, // Expandido para tablets (Sugestão 8)
    justifyContent: "center",
  },
  brandContainer: {
    alignItems: "center",
  },
  logoWrapper: {
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
    marginBottom: 32,
  },
  logo: {},
  title: {
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: -1.5,
    marginBottom: 16,
    textAlign: "center",
  },
  titleAccent: {
    color: "#35e6c6", 
  },
  subtitle: {
    color: "#9CA3AF", 
    textAlign: "center",
    maxWidth: 340, // Limitado para não quebrar feio (Sugestão 5)
    paddingHorizontal: 12,
  },
  actionGroup: {
    width: "100%",
    gap: 16,
  },
  btnPrimaryContainer: {
    width: "100%",
    borderRadius: 20,
    overflow: "hidden",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  btnGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btnPrimaryText: {
    color: "#061500",
    fontWeight: "700",
    letterSpacing: -0.3,
  },
  btnSecondary: {
    width: "100%",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  btnSecondaryText: {
    color: "#E5E7EB",
    fontWeight: "600",
  },
  btnPressed: {
    transform: [{ scale: 0.96 }],
    opacity: 0.85,
  },
  footerContainer: {
    alignItems: "center",
    width: "100%",
    gap: 16,
    marginTop: 10,
  },
  footerLine: {
    width: 40,
    height: 2,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 1,
  },
  footerText: {
    color: "#4B5563",
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
});